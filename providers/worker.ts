import { compileBytecode } from 'smoldot/bytecode'
import * as smoldot from 'smoldot/worker'

compileBytecode().then((bytecode) => postMessage(bytecode))
onmessage = (msg) => smoldot.run(msg.data)
