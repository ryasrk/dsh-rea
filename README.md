# DSH Plugin REA (Reverse Engineer Anything) v6.8.0

A DeepSeek Harness plugin providing a left sidebar entry and an interactive reverse engineering workbench for [REA v6.8.0](https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0).

## Features

- **Left Sidebar Navigation Entry**: Registered in `sidebar.panellist` with custom code-inspection icon and localized label.
- **Dedicated Main Workbench Panel**: Registered in `main` keyed slot under `rea-tools` to explore:
  - **Native Binaries**: Hopper, Ghidra, IDA Pro, Rizin/Cutter, objdump, ELF/PE/Mach-O layouts, Go/Rust compiler signatures, and GPU CUDA/HIP fatbin objects.
  - **Packaged Applications**: Electron/JS ASAR & IPC boundaries, Unity IL2CPP (metadata v24-39), .NET CIL assemblies, Godot PCK format 2/3/4, PyInstaller CArchive.
  - **Mobile & Android**: Headless JADX decompilation, APK signature verification (v1-v3.1), Apktool resource decoding, ADB runtime bridge, Flutter Dart snapshots.
  - **Network & Captures**: TShark PCAP/PCAPNG analysis, HAR/SAZ web session analysis, Chrome CDP browser observation.
  - **Dynamic & Forensics**: Frida dynamic hooking, GDB crash core forensics, Apple IPS reports, WebAssembly WAT decoding, EVM bytecode selectors.
  - **Agent RL Environments (New in 6.8.0)**: Build local mock environments from network captures or browser scenarios for Reinforcement Learning training or agent evaluation.
  - **Interactive Target Triage**: Paste any filename or artifact path to instantly see the recommended REA command, analysis engine, and AI prompt.
- **Host Tools**: Exposes `rea_tools_guide` to agents in the session.

## Installation

Install into the current DSH profile via `plugin_manager` with your local clone path:

```js
plugin_manager({
  action: 'install_bundle',
  target: '<your-clone-path>/dsh-plugin-rea'
})
```

Or from this repository:

```sh
git clone https://github.com/ryasrk/dsh-rea.git
```

Then point `plugin_manager` at the cloned `dsh-plugin-rea` directory.

## References

- [REA GitHub Release rea-agents-6.8.0](https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0)
- [REA Official Website](https://rea.tools/)
