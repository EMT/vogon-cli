#!/usr/bin/env node

import { Command } from "commander"
import axios from "axios"
import { existsSync, promises as fs } from "fs"
import dotenv from "dotenv"

dotenv.config()

const program = new Command()

interface Options {
  token: string
  projectId: string
  file?: string
}

const API_URL = process.env.VOGON_API_URL || "https://vogon.app/api"

// Push Command
const pushCommand = new Command("push")
  .description("Upload JSON file to the web service")
  .requiredOption(
    "-t, --token <token>",
    "Authorization token",
    process.env.VOGON_AUTH_TOKEN
  )
  .option("-p, --project-id <id>", "Project ID", process.env.VOGON_PROJECT_ID)
  .option(
    "-f, --file <path>",
    "Path to JSON file",
    process.env.VOGON_UPLOAD_FILE_PATH
  )
  .action(async (options: Options) => {
    const { token, projectId, file } = options

    if (!projectId) {
      console.error("Error: Project ID is required")
      process.exit(1)
    }

    if (!file || !existsSync(file)) {
      console.error("Error: File does not exist", file)
      process.exit(1)
    }

    try {
      const jsonData = await fs.readFile(file, "utf8")
      const response = await axios.post(
        `${API_URL}/projects/${projectId}/push`,
        jsonData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      console.log("Upload successful:", response.data)
    } catch (error: any) {
      console.error(
        "Error uploading file:",
        error.response ? error.response.data : error.message
      )
      console.error(error)
      process.exit(1)
    }
  })

// Pull Command
const pullCommand = new Command("pull")
  .description("Download JSON data from the web service")
  .requiredOption(
    "-t, --token <token>",
    "Authorization token",
    process.env.AUTH_TOKEN
  )
  .option("-p, --project-id <id>", "Project ID", process.env.PROJECT_ID)
  .action(async (options: Options) => {
    const { token, projectId } = options

    if (!projectId) {
      console.error("Error: Project ID is required")
      process.exit(1)
    }

    try {
      const response = await axios.get(
        `${API_URL}/projects/${projectId}/pull`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("Download successful:", response.data)
    } catch (error: any) {
      console.error(
        "Error downloading data:",
        error.response ? error.response.data : error.message
      )
      process.exit(1)
    }
  })

program
  .name("vogon")
  .version("1.0.0")
  .description(
    "CLI tool to interact with the Vogon translation management service"
  )
  .addCommand(pushCommand)
  .addCommand(pullCommand)

program.parse(process.argv)
