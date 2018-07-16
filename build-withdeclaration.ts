import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'
type Package = {
  name: string
  dependencies: Package[]
  dir: string
  built: boolean
}

let packagedir = path.join(__dirname, 'packages')

let packages = fs
  .readdirSync(packagedir)
  .filter(
    (c) =>
      fs.statSync(path.join(packagedir, c)).isDirectory() &&
      fs.existsSync(path.join(packagedir, c, 'package.json'))
  )
  .map((dir) => {
    let ppath = path.join(packagedir, dir, '/package.json')
    var { name, dependencies } = require(ppath)
    dependencies = Object.keys(dependencies || {}).filter(
      (d) => d.indexOf('profiscience/') >= 0
    )
    return { name, dependencies, dir, built: false } as Package
  })
  .reduce(
    (p, c) => {
      p[c.name] = c
      return p
    },
    {} as { [name: string]: Package }
  )

/*
function createCompilerHost(options: ts.CompilerOptions): ts.CompilerHost {
    return {
        getSourceFile,
        //getDefaultLibFileName: () => "lib.d.ts",
        getDefaultLibFileName: options => path.join(path.dirname(ts.sys.getExecutingFilePath()), ts.getDefaultLibFileName(options)), 
       // getDefaultLibFileName: () => "lib.d.ts",
        writeFile: (fileName, content) => ts.sys.writeFile(fileName, content),
        getCurrentDirectory: () => ts.sys.getCurrentDirectory(),   // { console.log("getCurrentDirectory: "+location); return location },
        getDirectories: (p) => ts.sys.getDirectories(p),
        getCanonicalFileName: fileName => ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
        getNewLine: () => ts.sys.newLine,
        useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
        fileExists,
        readFile,
        //resolveModuleNames()
    }
    
    function getDefaultLibLocation(): string {
        return ts.sys.getExecutingFilePath();
    }

    function fileExists(fileName: string): boolean {
        return ts.sys.fileExists(fileName);
    }

    function readFile(fileName: string): string | undefined {
        return ts.sys.readFile(fileName);
    }

    function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) {
        const sourceText = ts.sys.readFile(fileName);
        return sourceText !== undefined ? ts.createSourceFile(fileName, sourceText, languageVersion) : undefined;
    }
    /*
    function resolveModuleNames(moduleNames: string[], containingFile: string): ts.ResolvedModule[] {
        const resolvedModules: ts.ResolvedModule[] = [];
        for (const moduleName of moduleNames) {
            // try to use standard resolution
            let result = ts.resolveModuleName(moduleName, containingFile, options, { fileExists, readFile });
            if (result.resolvedModule) {
                resolvedModules.push(result.resolvedModule);
            }
            else {
                // check fallback locations, for simplicity assume that module at location should be represented by '.d.ts' file
                const modulePath = path.join(location, moduleName + ".d.ts");
                if (fileExists(modulePath)) {
                    resolvedModules.push({ resolvedFileName: modulePath });
                }
            }
        }
        return resolvedModules;
    }
}*/

function compile(fileNames: string[], options: ts.CompilerOptions): boolean {
  // var compilerHost = createCompilerHost(options);

  let program = ts.createProgram(fileNames, options)
  let emitResult = program.emit()

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics)

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      )
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      )
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      )
    } else {
      console.log(
        `${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`
      )
    }
  })

  return emitResult.emitSkipped
}

var targets: string[] = ['es5', 'esnext']

function buildPackage(p: Package) {
  if (p && !p.built) {
    p.dependencies.forEach((c) => {
      buildPackage(packages[c.name])
    })

    var ops = require('./tsconfig.json')
    var pdir = path.join(packagedir, p.dir)
    var currentDirectoryFiles = fs
      .readdirSync(pdir)
      .filter(
        (fileName: string) =>
          fileName.length >= 3 &&
          fileName.substr(fileName.length - 3, 3) === '.ts'
      )
    process.chdir('packages/' + p.dir)
    console.log(ts.sys.getCurrentDirectory())

    ops.declarationDir = '.'
    for (var target of targets) {
      ops.outDir = 'dist/' + target
      ops.target = target
      ops.declaration = true
      let success = compile(currentDirectoryFiles, ops)
      // handle skipped
    }
    process.chdir('../../')
    p.built = true
  }
}

Object.keys(packages).forEach((c) => {
  let pkg = packages[c]
  buildPackage(pkg)
})
