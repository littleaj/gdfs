# gdfs
A simple react app that let's you view, upload, download, and delete files on Google Drive.

## API Setup

Before it will run with data from Google Drive, you need to [create a GCP Project](https://console.cloud.google.com/projectcreate).

### Test Credentials
Then, follow the instructions [here](https://developers.google.com/drive/api/quickstart/js) to do the following...

> [!NOTE]
> The buttons in the docs link to sections in the _APIs & Services_ product section. You'll see buttons on a few pages that link over to the "new experience" in the _Google Auth Platform_ product section. It looks basically the same, but check the footnotes[^1] to see the old/new names for each section.

  * Enable the Drive API
  * Configure OAuth credentials[^2]
    * Type = **Web Application**
    * Add http://localhost:5173 to **Authorized JavaScript origins**
    * Add your Google account username/email to the **Test users** in the _OAuth consent screen_[^3]. Only these accounts will be able to sign in.
  * Create an API key
    * **Treat this like a password or any other secret credential**
    * I reccommend adding some restrictions to keep the API key as secure as possible during testing. This is what I added[^4]:
      * My IPv6 address in **IP address restrictions** (https://www.whatismyip.com/ helps)
      * Limited to _Google Drive API_ in **API restrictions**

### Scopes

In the _Google Auth Platform_ section under the _Data Access_ tab, add these Drive API scopes:
  * `https://www.googleapis.com/auth/drive.file`
  * `https://www.googleapis.com/auth/drive.readonly`

### Copy ClientID and ApiKey to `.env.local`

Rename `.env.local-empty` in the root of the repository to `.env.local` and set the respective variables (`VITE_CLIENT_ID` and `VITE_API_KEY`) using the **Client ID** and **API Key** created in the previous steps.

## Local Setup

To run locally, follow these steps:

1. [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), if you don't have it already.

I used these versions:

```console
user@host:~/gdfs$ node --version && npm -version
v20.16.0
10.9.0
```

2. Once `npm` is installed, run install the dependencies:

```console
user@host:~/gdfs$ npm install
```

## Building & Running locally

> [!IMPORTANT]
> Follow the instructions in the [Local Setup](#local-setup) setion before continuing to these sections.

This project uses [vite](https://vite.dev/guide/cli.html). Everything you should need is configured as an [npm](https://docs.npmjs.com/cli/v10/using-npm/scripts#npm-run-user-defined) script.

### Build the project

```console
user@host:~/gdfs$ npm run build
```

### Run the dev server

```console
user@host:~/gdfs$ npm run dev
```

### Run the tests

<!-- TODO -->
TBD

## Using the Project

<!-- TODO -->
TBD

---

[^1]: Like this!
[^2]: _Credentials_ or _Clients_
[^3]: _OAuth consent screen_ or _Audience_
[^4]: There's no "new experience" for this section. It's under _Credentials_ in the _API & Services_ section.