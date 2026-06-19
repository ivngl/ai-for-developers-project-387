# Changelog

## [1.2.0](https://github.com/ivngl/ai-for-developers-project-387/compare/v1.1.1...v1.2.0) (2026-06-19)


### Features

* add endTime to event types for availability windows ([fd3e837](https://github.com/ivngl/ai-for-developers-project-387/commit/fd3e83718db4271c9ab02bf3f30e7ab6d1150fd8))


### Bug Fixes

* **lighthouse:** generate HTML report from JSON instead of looking for .html files ([475932a](https://github.com/ivngl/ai-for-developers-project-387/commit/475932aaf4741bcf2fa50782d43c4a7b2bcac58f))
* **opencode-scheduled:** generate HTML report from JSON instead of looking for .html files ([dd598d2](https://github.com/ivngl/ai-for-developers-project-387/commit/dd598d2710b977e018243b155b32932af9fb2070))
* **opencode-scheduled:** replace opencode step with deterministic issue creation from JSON scores ([50db132](https://github.com/ivngl/ai-for-developers-project-387/commit/50db1320603baa5e5820f6a343e5cbefd037cac3))
* pass timezone offset from client to server for correct slot display ([1b4f0cb](https://github.com/ivngl/ai-for-developers-project-387/commit/1b4f0cbb159b616f5db78fe7fee553973008155d))
* use node -e instead of -c for Lighthouse HTML generation ([4dc54ef](https://github.com/ivngl/ai-for-developers-project-387/commit/4dc54efca94a5e80dd1cf68d30897b6f62c47ff5))

## [1.1.1](https://github.com/ivngl/ai-for-developers-project-387/compare/v1.1.0...v1.1.1) (2026-06-18)


### Bug Fixes

* invalid Lighthouse CI preset in .lighthouserc.json ([9c1466c](https://github.com/ivngl/ai-for-developers-project-387/commit/9c1466c736d46aa5e47cc330ff658debf9ea957c))
* split lhci autorun into collect+assert to skip error-prone upload step ([50d2a8d](https://github.com/ivngl/ai-for-developers-project-387/commit/50d2a8d27078f93973106b7b1564c4d1bdcb38c3))

## [1.1.0](https://github.com/ivngl/ai-for-developers-project-387/compare/v1.0.0...v1.1.0) (2026-06-17)


### Features

* add Lighthouse CI audit with desktop preset ([dafc56b](https://github.com/ivngl/ai-for-developers-project-387/commit/dafc56b11ff0ff32afabffdb4086a927b8e34df8))
* add nightly Lighthouse audit with opencode analysis ([da7ee17](https://github.com/ivngl/ai-for-developers-project-387/commit/da7ee177bb1c688a212bcf4ad4bef8b325d3a5c8))

## 1.0.0 (2026-06-17)


### Features

* add active link highlighting to navigation ([7842ea3](https://github.com/ivngl/ai-for-developers-project-387/commit/7842ea37bf4db2325af9fa3b36067240daf40fab))
* add event types, booking slots, admin auth, calendar UI, and TypeSpec spec ([27aee07](https://github.com/ivngl/ai-for-developers-project-387/commit/27aee07d813be3b943a8f597404fd377feb783c0))
* add OpenCode GitHub integration workflow ([01087b0](https://github.com/ivngl/ai-for-developers-project-387/commit/01087b08d7749bb1a0359da6b10480c2a29ee37b))
* prevent creating events in the past ([76edc5c](https://github.com/ivngl/ai-for-developers-project-387/commit/76edc5cbce48290040639f801ac9a8335418da7f))
* replace raw CSS with Mantine v7 UI library ([292bc32](https://github.com/ivngl/ai-for-developers-project-387/commit/292bc32694fbba9d5bf596baaeac06d50538d9f8))
* scaffold project with React + Vite client and Express + Prisma server ([41e663e](https://github.com/ivngl/ai-for-developers-project-387/commit/41e663ebe8df0eb8b704167de83d477d3c5890f5))
* use PORT from env in e2e config and CI workflow ([7ea416a](https://github.com/ivngl/ai-for-developers-project-387/commit/7ea416a6f04d2babd92aa684aa0e80eaf8b0c8a9))


### Bug Fixes

* add db schema push to CI and error handling middleware ([1c5e0a7](https://github.com/ivngl/ai-for-developers-project-387/commit/1c5e0a795f6b89ce1d1888fc002a585909e98843))
* add PORT to .env ([e7cba13](https://github.com/ivngl/ai-for-developers-project-387/commit/e7cba139f69ac78236935891e6ec4c2cfd5b2263))
* allow /dev/* external directory access for CI ([93ee7ad](https://github.com/ivngl/ai-for-developers-project-387/commit/93ee7adb566b378613aef323ee31a7087f9ad22a))
* build client before e2e tests in CI ([00f4729](https://github.com/ivngl/ai-for-developers-project-387/commit/00f4729a80b6f96269c268eff33328ddff1ee045))
* change model to minimax ([6efafba](https://github.com/ivngl/ai-for-developers-project-387/commit/6efafba6fd409a17a03be835c524f4f43fc5cf44))
* configure git identity in workflow for opencode commits ([5a68ade](https://github.com/ivngl/ai-for-developers-project-387/commit/5a68adec304c78ae2109f91d9cb5859d1b0abd85))
* fix e2e test config, server crashes, and flaky concurrency ([856ecc0](https://github.com/ivngl/ai-for-developers-project-387/commit/856ecc00b7262b9a9720a822b29e8ddf315927fb))
* grant write permissions and pass GITHUB_TOKEN to OpenCode action ([327a3cf](https://github.com/ivngl/ai-for-developers-project-387/commit/327a3cfed9b6871928dcd6a3dbf60ea6968013a0))
* pass GITHUB_TOKEN for use_github_token ([cef0898](https://github.com/ivngl/ai-for-developers-project-387/commit/cef0898b506c206a7f547747e688b0d4403d5ed3))
* pin opencode action to v1.17.7 and add write permissions ([6ed067d](https://github.com/ivngl/ai-for-developers-project-387/commit/6ed067dd591f8afdb82545c2ecfa764500da3c20))
* remove use_github_token in favor of OpenCode app auth ([cfb2bd0](https://github.com/ivngl/ai-for-developers-project-387/commit/cfb2bd0e7da3b9a8d7ca548cee945739c958f880))
* replace useEffect redirect with declarative Navigate in AdminLayout ([82acaf1](https://github.com/ivngl/ai-for-developers-project-387/commit/82acaf1a9013583f3fca8e82aaf0ab734b698893))
* resolve test isolation, state leakage, and booking/slot scoping bugs ([f50e56b](https://github.com/ivngl/ai-for-developers-project-387/commit/f50e56b5268adeda0047eaaa44e8a6e86ca524ec))
* revert 127.0.0.1 back to localhost, use vite --host in CI ([79227de](https://github.com/ivngl/ai-for-developers-project-387/commit/79227de84a59b2a81f3458b470c4d6c1bf3ba995))
* switch model to big-pickle ([f5c566b](https://github.com/ivngl/ai-for-developers-project-387/commit/f5c566b0b6540388ba41592b038aed7276ba29e8))
* switch to faster deepseek-v4-flash-free model ([e9c9c12](https://github.com/ivngl/ai-for-developers-project-387/commit/e9c9c1235a49e21f5f05bb1f183c3de126351dba))
* tests ([04f8a4e](https://github.com/ivngl/ai-for-developers-project-387/commit/04f8a4e3baf6d9c5c477451f753a38fdec429983))
* update delete-with-bookings test to expect error message ([2ef705a](https://github.com/ivngl/ai-for-developers-project-387/commit/2ef705a75d26f1f037d034c2c1416a83e4ec6c9c))
* use GITHUB_TOKEN via use_github_token: true instead of secrets.GITHUB_TOKEN ([16dd240](https://github.com/ivngl/ai-for-developers-project-387/commit/16dd240075cd85f2633f8bb411247aa36c80e280))
* use PAT instead of GITHUB_TOKEN for release-please ([bea8304](https://github.com/ivngl/ai-for-developers-project-387/commit/bea830407bdda494214deb2a84d34338abfd31c4))

## [1.1.0](https://github.com/ivngl/ai-for-developers-project-386/compare/v1.0.0...v1.1.0) (2026-06-16)


### Features

* add active link highlighting to navigation ([cf8a1a3](https://github.com/ivngl/ai-for-developers-project-386/commit/cf8a1a3f2b2189c19e1ba4a1aa10ea461fb24caf))
* add event types, booking slots, admin auth, calendar UI, and TypeSpec spec ([1971462](https://github.com/ivngl/ai-for-developers-project-386/commit/1971462788a00c1a9a4927f03839744bd92bf6a7))
* prevent creating events in the past ([a97c1b7](https://github.com/ivngl/ai-for-developers-project-386/commit/a97c1b7e819e35ae3619618ada1da349f8ad2dd5))
* replace raw CSS with Mantine v7 UI library ([194f7d7](https://github.com/ivngl/ai-for-developers-project-386/commit/194f7d7952cc7681ba086b5c7350c34a62111494))
* scaffold project with React + Vite client and Express + Prisma server ([88646c2](https://github.com/ivngl/ai-for-developers-project-386/commit/88646c224e4d061610c7d4a680deb2d624e0c0fc))
* use PORT from env in e2e config and CI workflow ([29295c8](https://github.com/ivngl/ai-for-developers-project-386/commit/29295c8e03e2a20eba797688596f434e2b73e18f))


### Bug Fixes

* add db schema push to CI and error handling middleware ([bc100d6](https://github.com/ivngl/ai-for-developers-project-386/commit/bc100d64eed89a99682596a8b7823b60cf4d2bc7))
* add PORT to .env ([1d5b1fd](https://github.com/ivngl/ai-for-developers-project-386/commit/1d5b1fde25089c3aed9dcf576a901ed5f5d441ab))
* fix e2e test config, server crashes, and flaky concurrency ([79d0cd9](https://github.com/ivngl/ai-for-developers-project-386/commit/79d0cd928e4ba7ba427b80b563d401a5e48fb902))
* replace useEffect redirect with declarative Navigate in AdminLayout ([46ddf16](https://github.com/ivngl/ai-for-developers-project-386/commit/46ddf16dfcc2059c107c67f01dc388947dfe572d))
* resolve test isolation, state leakage, and booking/slot scoping bugs ([084a88b](https://github.com/ivngl/ai-for-developers-project-386/commit/084a88b573a2c43da46f55fa6e48774ee4fd25d1))
* revert 127.0.0.1 back to localhost, use vite --host in CI ([7c3106b](https://github.com/ivngl/ai-for-developers-project-386/commit/7c3106b9689cb728b2d8ed46638e67e7b97725d9))
* tests ([3b76763](https://github.com/ivngl/ai-for-developers-project-386/commit/3b7676374a79236f4289f5d6ebe7224c449fcf9e))
* update delete-with-bookings test to expect error message ([d93f861](https://github.com/ivngl/ai-for-developers-project-386/commit/d93f8614fc567cea87aed69c985fc8b3774614a1))

## 1.0.0 (2026-06-14)


### Features

* add event types, booking slots, admin auth, calendar UI, and TypeSpec spec ([1971462](https://github.com/ivngl/ai-for-developers-project-386/commit/1971462788a00c1a9a4927f03839744bd92bf6a7))
* replace raw CSS with Mantine v7 UI library ([194f7d7](https://github.com/ivngl/ai-for-developers-project-386/commit/194f7d7952cc7681ba086b5c7350c34a62111494))
* scaffold project with React + Vite client and Express + Prisma server ([88646c2](https://github.com/ivngl/ai-for-developers-project-386/commit/88646c224e4d061610c7d4a680deb2d624e0c0fc))


### Bug Fixes

* tests ([3b76763](https://github.com/ivngl/ai-for-developers-project-386/commit/3b7676374a79236f4289f5d6ebe7224c449fcf9e))
