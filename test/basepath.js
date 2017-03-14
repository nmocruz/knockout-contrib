import ko from 'knockout'
import $ from 'jquery'

import Router from '../dist/modules'

ko.components.register('basepath', {
  template: `
    <a id="foo-link" data-bind="path: '/foo/foo'"></a>
    <ko-component-router></ko-component-router>
  `,
  viewModel: class BasePath {
    constructor({ t, done }) {
      let count = 0

      Router.setConfig({
        base: '/base'
      })

      Router.useRoutes({
        '/foo': {
          '/foo': 'foo'
        },
        '/bar': {
          '/bar': 'bar'
        }
      })

      history.pushState(null, null, '/base/foo/foo')

      ko.components.register('foo', {
        viewModel: class {
          constructor(ctx) {
            t.pass('initializes with basepath')
            t.equals('/base/foo/foo', location.pathname, 'uses basepath in url on init')

            ctx.router.initialized.then(() => {
              t.equals($('#foo-link').attr('href'), '/base/foo/foo', 'sets href correctly in path binding')
              Router.update('/bar/bar')
            })
          }
        }
      })

      ko.components.register('bar', {
        viewModel: class {
          constructor(ctx) {
            t.pass('navigates correctly with basepath')
            t.equals('/base/bar/bar', location.pathname, 'uses basepath in url on update')

            done()
          }
        }
      })
    }

    dispose() {
      Router.setConfig({
        base: ''
      })
    }
  }
})
