import process from 'process'
import minimist from 'minimist'
import { Web3Storage, File, getFilesFromPath } from 'web3.storage'


async function getFiles (path) {
  const files = await getFilesFromPath(path)
  console.log(`read ${files.length} file(s) from ${path}`)
  return files
}

function makeFileObjects () {
  // You can create File objects from a Buffer of binary data
  // see: https://nodejs.org/api/buffer.html
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = { hello: 'world' }
  const buffer = Buffer.from(JSON.stringify(obj))

  const files = [
    new File(['contents-of-file-1'], 'plain-utf8.txt'),
    new File([buffer], 'hello.json')
  ]
  return files
}


async function storeFiles (files) {
  
}

function getAccessToken () {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  // return process.env.WEB3STORAGE_TOKEN
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE5OURhYzFkODAxYTk2ZjU4ZTU0NmM0OTk5NzM0Zjg1MDgzY2NkNTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM4NTY2MTc5NzIsIm5hbWUiOiJ4ZGMtaGVhbHRoIn0.LRbF9s7Lm194YtIA7hgakSFoPoEe2BNzDxuM26CBCwY"
  return token
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}


export async function upload(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

