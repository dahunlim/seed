// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  API_ENDPOINT: 'http://localhost:3000/',
  APP_NAME: 'S-ENGLISH',
  AWS_S3_MEDIA_TEMP_URL: 'https://s3.ap-south-1.amazonaws.com/s-english.biz-file-temp/',
  AWS_S3_MEDIA_URL: 'https://s3.ap-south-1.amazonaws.com/s-english.biz-file/'
};
