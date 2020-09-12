# Next Template

_if a line contains the following `<cs>` it means that it is only used on a Custom Server and that it can safely removed if it is not used_

## Folders

- \__tests__: Test files to test webpage or single components
- .vscode: VSCode settings for Stylelint
- docker: Docker files to launch in a Container
- public: Static files
  - assets: Generally used for Static assets like Pictures
- scripts: Contains Addons script (like Favicon generation or sitemap generation)
- src: Source folder
  - client: Client-side Elements
    - components: Components used in pages
    - libs: Code used by the Client
    - styl: Stylus file location
  - common: Elements used by both Client-side and Server-side code
  - pages: Contains your NextJS pages
  - server: Custom server folder `<cs>`

## TODO list

### Typescript/Javascript

- [x] Support Typescript
- [x] Support Javascript
- [ ] Support Javascript files Linting
- [x] Unit Testing
- [ ] Lint unit tests

### Stylus

- [x] Support Stylus files
- [x] Support Stylus Styled-jsx (mutually exclusive with purgeCSS)
- [x] Support PurgeCSS (mutually exclusive with styled-jsx)
- [ ] Support both Stylus CSS modules and purge CSS
- [ ] Support typed stylus files

## Custom Server

If you want to have a Custom server you simply have to start editing `src/server/server.ts` and after that to dev run `yarn cs-dev`

## Packages

### Dependencies

- @zeit/next-stylus: Stylus support in Nextjs
- express: Server `<cs>`
- glob: Sitemap Generation
- next: Nextjs
- next-compose-plugins: Better plugin formatting in config
- next-purgecss: PurgeCSS Plugin in config
- next-seo: SEO for NextJS
- react: React
- react-dom: React DOM (React Dependency)
- react-feather: Icon library
- serve: Server for static website
- styled-jsx-plugin-stylus: Styled-JSX plugin of Stylus
- stylus: Stylus
- typescript: Typescript
- webpack: Webpack

### Dev Dependencies

- @babel/core: Tests Dependency
- @babel/preset-env: Tests Dependency
- @babel/preset-react: Tests Dependency
- @types/express: Express typing for Typescript `<cs>`
- @types/jest: Testing Typing
- @types/node: Typescript Typing
- @types/react: Typescript Typing
- @types/react-test-renderer: Testings Typing
- @typescript-eslint/eslint-plugin: ESLint Typescript Plugin
- @typescript-eslint/parser: ESLint Typescript parser
- babel-jest: Compile files for jest use
- eslint: ESLint
- eslint-config-google: ESLint base configuration
- eslint-import-resolver-typescript:
- eslint-plugin-import: eslint support for imports
- eslint-plugin-react: ESLint React Plugin
- eslint-plugin-sonarjs: eslint support for code quality
- favicons: Favicon generator
- jest: Jest tessting framework
- react-test-renderer: Test React components
- sitemap: Sitemap generator
- stylelint: Stylesheet linting
- stylelint-config-recommended: Stylelint recommended settings
- stylelint-plugin-stylus: Stylelint plugin for stylus
- ts-node-dev: Start the developpement server and restart it on changes `<cs>`
