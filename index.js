/**
 * Host half of the REA Tools bundle.
 * Provides reverse engineering documentation and tool references for REA v6.8.0.
 */
export const inject = ['tools'];

export function apply(ctx) {
  if (ctx.tools?.register) {
    ctx.tools.register({
      name: 'rea_tools_guide',
      description: 'Get command references, supported targets, and analysis workflows for REA (Reverse Engineer Anything) v6.8.0 reverse engineering tools.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['overview', 'native', 'apps', 'mobile', 'network', 'runtime', 'environments', 'breaking_changes'],
            description: 'The REA tool category to retrieve guidelines and command recipes for.'
          }
        },
        required: ['category']
      },
      output: {
        schema: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            summary: { type: 'string' },
            commands: { type: 'array', items: { type: 'string' } }
          }
        },
        render(args, value) {
          return [{
            type: 'text',
            text: typeof value === 'string' ? value : JSON.stringify(value, null, 2)
          }];
        }
      },
      async execute(args) {
        const cat = args?.category || 'overview';
        const guide = {
          overview: {
            category: 'overview',
            summary: 'REA (Reverse Engineer Anything) v6.8.0 connects coding agents to local reverse engineering tools across native binaries, Electron apps, .NET, Android APKs, and RL environments (https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0).',
            commands: [
              'npx rea-agents@6.8.0 setup',
              'npm install --global rea-agents@6.8.0',
              'rea --help'
            ]
          },
          native: {
            category: 'native',
            summary: 'Inspect ELF, PE, Mach-O, and DOL executables. Decompile with Hopper, Ghidra, IDA Pro, Rizin, or objdump. Detect Go, Rust cargo-auditable, and NativeAOT.',
            commands: [
              'rea inspect-binary <target> --provider ghidra',
              'rea analyze-function <target> <symbol> --detail complete',
              'rea inspect-pe-imports <target.exe> --json',
              'rea inspect-elf-notes <target.elf> --json'
            ]
          },
          apps: {
            category: 'apps',
            summary: 'Analyze packaged applications: Electron/JS ASAR & IPC, Unity IL2CPP (metadata v24-39), .NET CIL assemblies, Godot PCK format 2/3/4, PyInstaller CArchive.',
            commands: [
              'npx -y rea-agents@6.8.0 analyze-javascript-application <path> --json',
              'rea inspect-il2cpp <global-metadata.dat> --detail complete',
              'rea inspect-dotnet-assembly <assembly.dll>',
              'rea extract-godot-pck <game.pck> --out ./extracted'
            ]
          },
          mobile: {
            category: 'mobile',
            summary: 'Android APK analysis with headless JADX, APK v1-v3.1 signature checks, Apktool resource decoding, ADB runtime inspection, and Flutter Dart snapshot triage.',
            commands: [
              'rea decompile-apk <app.apk> --string-tables-only',
              'rea inspect-apk-signature <app.apk>',
              'rea inspect-adb-device',
              'rea inspect-flutter-app <app.apk>'
            ]
          },
          network: {
            category: 'network',
            summary: 'TShark packet capture analysis (PCAP/PCAPNG), HAR / Fiddler SAZ web capture analysis, API route discovery, and headless Chrome browser observation.',
            commands: [
              'rea inspect-packet-capture <capture.pcap> --filter "http || dns"',
              'rea analyze-web-capture <session.har> --json',
              'rea observe-browser <url> --screenshot'
            ]
          },
          runtime: {
            category: 'runtime',
            summary: 'Dynamic Frida instrumentation, GDB crash forensics, Apple IPS crashes, WABT WebAssembly decoding, EVM bytecode selectors, SQLite table snapshots.',
            commands: [
              'rea instrument-with-frida <pid_or_name> -s script.js --json',
              'rea analyze-crash-core <dump.core> --json',
              'rea inspect-wasm-artifact <module.wasm>',
              'rea inspect-evm-bytecode <bytecode.hex>'
            ]
          },
          environments: {
            category: 'environments',
            summary: 'REA 6.8.0 Highlight: Build local mock environments from network captures or browser scenarios for Reinforcement Learning (RL) or agent evaluations.',
            commands: [
              'rea environment-build ./session.har ./my-env --name my-env --json',
              'agent-env run ./my-env'
            ]
          },
          breaking_changes: {
            category: 'breaking_changes',
            summary: 'REA 6.8.0 breaking changes: analyze_function defaults to retained summary (use detail: "complete"); --format jsonl emits metadata record; Node ^22.23.4, ^24.22.1, >=26.12.1; input schemas default to compact.',
            commands: [
              'export REA_MCP_INPUT_SCHEMA_PROFILE=full',
              'rea analyze-function <target> <sym> --detail complete --evidence_output'
            ]
          }
        };
        return guide[cat] || guide.overview;
      }
    });
  }
}
