# @vogonapp/cli

@vogonapp/cli is a command-line tool to interact with the Vogon translation management service. It provides two main subcommands: `push` for uploading JSON files and `pull` for downloading JSON data.

## Installation

To install Vogon CLI as a local package:

```sh
bun install @vogonapp/cli
```

Alternatively, link the package for development purposes:

```sh
bun link
```

## Usage

Vogon CLI has the following subcommands:

### `vogon push`

Uploads a JSON file to the web service.

#### Options

- `-t, --token <token>` (required): The authorization token used for authentication (can be provided through the `VOGON_AUTH_TOKEN` environment variable, which is encouraged as a security best practice).
- `-p, --project-id <id>`: The project ID for the upload (can be provided through the `VOGON_PROJECT_ID` environment variable).
- `-f, --file <path>`: The path to the JSON file to upload (can be provided through the `VOGON_UPLOAD_FILE_PATH` environment variable).

#### Example

```sh
vogon push --token YOUR_AUTH_TOKEN --project-id YOUR_PROJECT_ID --file path/to/your/file.json
```

### `vogon pull`

Downloads JSON data from the web service.

#### Options

- `-t, --token <token>` (required): The authorization token used for authentication (can be provided through the `VOGON_AUTH_TOKEN` environment variable, which is encouraged as a security best practice).
- `-p, --project-id <id>`: The project ID for the download (can be provided through the `VOGON_PROJECT_ID` environment variable).

#### Example

```sh
vogon pull --token YOUR_AUTH_TOKEN --project-id YOUR_PROJECT_ID
```

## Environment Variables

Vogon CLI uses the following environment variables for configuration:

- `VOGON_API_URL`: The base URL of the API (default: `https://vogon.app/api`). Usually, this does not need to be set as the default is the correct URL for the service.
- `VOGON_AUTH_TOKEN`: The authorization token used for both upload and download commands.
- `VOGON_PROJECT_ID`: The project ID used in `push` and `pull` commands.
- `VOGON_UPLOAD_FILE_PATH`: The path to the JSON file to be uploaded in the `push` command.

To use environment variables, create a `.env` file in your project root with the following content:

```
VOGON_API_URL=https://vogon.app/api
VOGON_AUTH_TOKEN=your_auth_token
VOGON_PROJECT_ID=your_project_id
VOGON_UPLOAD_FILE_PATH=path/to/your/file.json
```

## License

MIT License

## Author

Vogon CLI is developed and maintained by [Vogon](https://vogon.app).
