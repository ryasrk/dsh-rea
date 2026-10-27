/**
 * Client module for REA Reverse Engineering Tools plugin (rea-agents v6.8.0).
 * Registers:
 * 1. An icon in `sidebar.panellist` slot with id 'rea-tools'.
 * 2. A comprehensive reverse engineering workbench in `main` keyed slot with key 'rea-tools'.
 */
window.__ModuleLoader__.load({
  id: 'dsh-plugin-rea',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /* ── Scoped Styles ──────────────────────────────────────────────────────── */
    const CSS = `
      .rea-panel-root {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: var(--dsw-alias-bg-base, #0d1117);
        color: var(--dsw-alias-label-primary, #e6edf3);
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .rea-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 20px;
        background: var(--dsw-alias-bg-layer-1, #161b22);
        border-bottom: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.1));
        gap: 16px;
        flex-shrink: 0;
      }
      .rea-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .rea-header-title {
        font-size: 17px;
        font-weight: 700;
        letter-spacing: -0.2px;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--dsw-alias-label-primary, #ffffff);
      }
      .rea-header-sub {
        font-size: 12px;
        color: var(--dsw-alias-label-secondary, #8b949e);
        margin-top: 2px;
      }
      .rea-header-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .rea-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12.5px;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.15));
        background: var(--dsw-alias-bg-layer-2, #21262d);
        color: var(--dsw-alias-label-primary, #c9d1d9);
        transition: all 0.15s ease;
        text-decoration: none;
      }
      .rea-btn:hover {
        background: var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.2));
        color: #ffffff;
        border-color: var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.3));
      }
      .rea-btn-primary {
        background: #2563eb;
        border-color: #3b82f6;
        color: #ffffff;
      }
      .rea-btn-primary:hover {
        background: #1d4ed8;
        border-color: #60a5fa;
      }
      .rea-badge {
        display: inline-flex;
        align-items: center;
        padding: 2px 7px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.2px;
      }
      .rea-badge-brand {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
        border: 1px solid rgba(56, 189, 248, 0.3);
      }
      .rea-badge-new {
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
        border: 1px solid rgba(34, 197, 94, 0.3);
      }
      .rea-badge-warn {
        background: rgba(245, 158, 11, 0.15);
        color: #fbbf24;
        border: 1px solid rgba(245, 158, 11, 0.3);
      }
      .rea-badge-purple {
        background: rgba(168, 85, 247, 0.15);
        color: #c084fc;
        border: 1px solid rgba(168, 85, 247, 0.3);
      }
      .rea-nav-tabs {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 16px;
        background: var(--dsw-alias-bg-layer-1, #161b22);
        border-bottom: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.1));
        overflow-x: auto;
        flex-shrink: 0;
      }
      .rea-tab-btn {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12.5px;
        font-weight: 500;
        color: var(--dsw-alias-label-secondary, #8b949e);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
        white-space: nowrap;
      }
      .rea-tab-btn:hover {
        color: var(--dsw-alias-label-primary, #ffffff);
        background: rgba(255, 255, 255, 0.05);
      }
      .rea-tab-btn.active {
        color: #ffffff;
        background: rgba(56, 189, 248, 0.15);
        font-weight: 600;
      }
      .rea-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .rea-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
        gap: 16px;
      }
      .rea-card {
        background: var(--dsw-alias-bg-layer-1, #161b22);
        border: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.1));
        border-radius: 8px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .rea-card:hover {
        border-color: var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.2));
      }
      .rea-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .rea-card-title {
        font-size: 14.5px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--dsw-alias-label-primary, #ffffff);
      }
      .rea-card-desc {
        font-size: 12.5px;
        color: var(--dsw-alias-label-secondary, #8b949e);
        line-height: 1.5;
      }
      .rea-features-list {
        font-size: 12px;
        color: var(--dsw-alias-label-secondary, #94a3b8);
        margin: 0;
        padding-left: 18px;
        line-height: 1.6;
      }
      .rea-code-box {
        position: relative;
        background: var(--dsw-alias-bg-base, #0d1117);
        border: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.1));
        border-radius: 6px;
        padding: 10px 12px;
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
        font-size: 12px;
        color: #38bdf8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        overflow-x: auto;
      }
      .rea-copy-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #94a3b8;
        border-radius: 4px;
        padding: 3px 8px;
        font-size: 11px;
        cursor: pointer;
        flex-shrink: 0;
        transition: all 0.15s ease;
      }
      .rea-copy-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #ffffff;
      }
      .rea-prompt-box {
        background: rgba(56, 189, 248, 0.05);
        border: 1px solid rgba(56, 189, 248, 0.2);
        border-radius: 6px;
        padding: 10px 12px;
        font-size: 12px;
        color: #cbd5e1;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        line-height: 1.5;
      }
      .rea-input {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 12px;
        border-radius: 6px;
        background: var(--dsw-alias-bg-base, #0d1117);
        border: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.2));
        color: #ffffff;
        font-size: 13px;
        font-family: inherit;
        outline: none;
      }
      .rea-input:focus {
        border-color: #38bdf8;
      }
    `;

    function insertCss() {
      if (typeof document === 'undefined') return;
      const id = 'dsh-plugin-rea-styles';
      if (document.getElementById(id)) return;
      const el = document.createElement('style');
      el.id = id;
      el.textContent = CSS;
      document.head.appendChild(el);
    }

    /* ── Sidebar Glyph ──────────────────────────────────────────────────────── */
    function ReaSidebarIcon(props) {
      const size = props && typeof props.size === 'number' ? props.size : 18;
      const active = props && props.active === true;
      const strokeColor = active ? 'var(--dsw-alias-brand-primary, #38bdf8)' : 'currentColor';
      return h('svg', {
        viewBox: '0 0 24 24',
        width: size,
        height: size,
        fill: 'none',
        stroke: strokeColor,
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        style: { display: 'block' },
      },
        // Lens
        h('circle', { cx: 10.5, cy: 10.5, r: 7.5 }),
        // Handle
        h('path', { d: 'M16 16l5.5 5.5' }),
        // Code symbol inside lens
        h('path', { d: 'M8.5 8.5l-2 2 2 2', strokeWidth: 1.5 }),
        h('path', { d: 'M12.5 8.5l2 2-2 2', strokeWidth: 1.5 }),
        h('path', { d: 'M11.5 8l-2 5', strokeWidth: 1.5 })
      );
    }

    /* ── Helper: Copy to Clipboard ─────────────────────────────────────────── */
    function CopyButton(props) {
      const text = props.text;
      const [copied, setCopied] = React.useState(false);

      const handleCopy = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
        }
      };

      return h('button', {
        type: 'button',
        className: 'rea-copy-btn',
        onClick: handleCopy,
        title: 'Copy to clipboard',
      }, copied ? '✓ Copied' : 'Copy');
    }

    /* ── Main Workbench Panel ──────────────────────────────────────────────── */
    function ReaPanel(props) {
      insertCss();
      const [activeTab, setActiveTab] = React.useState('overview');
      const [targetInput, setTargetInput] = React.useState('');

      // Analyze typed path to give real-time triage guidance
      const targetTriage = React.useMemo(() => {
        const trimmed = targetInput.trim().toLowerCase();
        if (!trimmed) return null;

        if (trimmed.endsWith('.asar') || trimmed.endsWith('.js') || trimmed.includes('electron')) {
          return {
            category: 'JavaScript / Electron App',
            engine: 'REA Static JS Analyzer (Node.js/npm)',
            command: `npx -y rea-agents@6.8.0 analyze-javascript-application "${targetInput.trim()}" --json`,
            prompt: `Inspect "${targetInput.trim()}", recover Electron IPC channels, preload bridges, and entry routes, and explain how the feature works.`,
            badge: 'Electron / JS'
          };
        }
        if (trimmed.endsWith('global-metadata.dat') || trimmed.includes('il2cpp')) {
          return {
            category: 'Unity IL2CPP Metadata',
            engine: 'Built-in IL2CPP Parser (v24/27/29/31/39)',
            command: `rea inspect-il2cpp "${targetInput.trim()}" --detail complete --json`,
            prompt: `Analyze the Unity IL2CPP global-metadata at "${targetInput.trim()}", recover types, methods, and export Ghidra seeds for decompilation.`,
            badge: 'Unity IL2CPP'
          };
        }
        if (trimmed.endsWith('.apk') || trimmed.endsWith('.aar')) {
          return {
            category: 'Android Application Package',
            engine: 'Headless JADX, Apktool, & Signature Checker',
            command: `rea decompile-apk "${targetInput.trim()}" --string-tables-only && rea inspect-apk-signature "${targetInput.trim()}"`,
            prompt: `Decompile "${targetInput.trim()}", verify APK signing schemes (v1-v3.1), and inspect AndroidManifest activities and network security config.`,
            badge: 'Android APK'
          };
        }
        if (trimmed.endsWith('.pcap') || trimmed.endsWith('.pcapng') || trimmed.endsWith('.cap')) {
          return {
            category: 'Packet Capture',
            engine: 'TShark 4.x & capinfos',
            command: `rea inspect-packet-capture "${targetInput.trim()}" --filter "http || dns || tls" --json`,
            prompt: `Analyze the packet capture at "${targetInput.trim()}", extract endpoints, TLS SNI, HTTP requests, and protocol distribution.`,
            badge: 'PCAP / Network'
          };
        }
        if (trimmed.endsWith('.har') || trimmed.endsWith('.saz')) {
          return {
            category: 'Web Network Capture',
            engine: 'HAR/SAZ Model & RL Environment Builder',
            command: `rea environment-build "${targetInput.trim()}" ./my-env --name my-env --json`,
            prompt: `Convert the network capture "${targetInput.trim()}" into a runnable RL mock environment and build tests for its verified reads and writes.`,
            badge: 'RL Environment'
          };
        }
        if (trimmed.endsWith('.core') || trimmed.endsWith('.dump') || trimmed.endsWith('.ips')) {
          return {
            category: 'Crash Dump / Core Forensic',
            engine: 'pwntools / GDB / Apple IPS Parser',
            command: `rea analyze-crash-core "${targetInput.trim()}" --json`,
            prompt: `Analyze the crash report at "${targetInput.trim()}", inspect faulting thread registers, signals, and mapped executable boundaries.`,
            badge: 'Crash Forensics'
          };
        }
        if (trimmed.endsWith('.pck')) {
          return {
            category: 'Godot PCK Archive',
            engine: 'Built-in Godot Format 2, 3, 4 Reader',
            command: `rea extract-godot-pck "${targetInput.trim()}" --out ./extracted --json`,
            prompt: `Extract the Godot PCK package at "${targetInput.trim()}", inventory embedded GDScript files and assets.`,
            badge: 'Godot PCK'
          };
        }
        if (trimmed.endsWith('.wasm') || trimmed.endsWith('.wat')) {
          return {
            category: 'WebAssembly Artifact',
            engine: 'WABT 1.0.42 Disassembler & Validator',
            command: `rea inspect-wasm-artifact "${targetInput.trim()}" --wat --json`,
            prompt: `Disassemble "${targetInput.trim()}" into WebAssembly Text format (WAT), examine imported and exported functions and memory layout.`,
            badge: 'WASM'
          };
        }
        // Default native binary
        return {
          category: 'Native Executable / Library',
          engine: 'Hopper, Ghidra, IDA Pro, or Rizin',
          command: `rea inspect-binary "${targetInput.trim()}" --provider ghidra`,
          prompt: `Inspect the binary at "${targetInput.trim()}", recover pseudocode, strings, and cross-references for the target routine.`,
          badge: 'Native Binary'
        };
      }, [targetInput]);

      // Top Header
      const header = h('div', { className: 'rea-header' },
        h('div', { className: 'rea-header-left' },
          h('div', {
            style: {
              width: 36, height: 36, borderRadius: 8,
              background: 'linear-gradient(135deg, #1e3a8a, #0284c7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
            }
          }, h(ReaSidebarIcon, { size: 22, active: true })),
          h('div', null,
            h('div', { className: 'rea-header-title' },
              'Reverse Engineering Assistant',
              h('span', { className: 'rea-badge rea-badge-brand' }, 'REA v6.8.0'),
              h('span', { className: 'rea-badge rea-badge-new' }, 'MCP Server')
            ),
            h('div', { className: 'rea-header-sub' },
              'Deep analysis across native binaries, Electron apps, .NET, Unity IL2CPP, APKs, network captures, and RL environments'
            )
          )
        ),
        h('div', { className: 'rea-header-actions' },
          h('a', {
            className: 'rea-btn',
            href: 'https://github.com/morluto/rea/releases/tag/rea-agents-6.8.0',
            target: '_blank',
            rel: 'noopener noreferrer'
          }, 'Release Notes ↗'),
          h('a', {
            className: 'rea-btn',
            href: 'https://rea.tools/',
            target: '_blank',
            rel: 'noopener noreferrer'
          }, 'Docs (rea.tools) ↗'),
          // Back to chat button
          h('button', {
            type: 'button',
            className: 'rea-btn rea-btn-primary',
            onClick: () => {
              if (props && props.selectPanel) props.selectPanel(null);
              else if (typeof window !== 'undefined' && window.__DSH_LAYOUT__ && window.__DSH_LAYOUT__.selectPanel) {
                window.__DSH_LAYOUT__.selectPanel(null);
              }
            }
          }, '← Conversation')
        )
      );

      // Tabs
      const tabs = [
        { id: 'overview', label: '🌟 Overview & Setup' },
        { id: 'native', label: '⚙️ Native Binaries' },
        { id: 'apps', label: '📦 Packaged & Managed Apps' },
        { id: 'mobile', label: '📱 Mobile & Android' },
        { id: 'network', label: '🌐 Network & Captures' },
        { id: 'runtime', label: '🔬 Dynamic & Forensics' },
        { id: 'environments', label: '🤖 Agent RL Environments (6.8.0)' },
        { id: 'triage', label: '⚡ Interactive Triage' },
      ];

      const navTabs = h('div', { className: 'rea-nav-tabs' },
        tabs.map(tab => h('button', {
          key: tab.id,
          type: 'button',
          className: 'rea-tab-btn' + (activeTab === tab.id ? ' active' : ''),
          onClick: () => setActiveTab(tab.id)
        }, tab.label))
      );

      // Render tab contents
      let tabContent = null;

      if (activeTab === 'overview') {
        tabContent = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          // Welcome Banner
          h('div', {
            className: 'rea-card',
            style: {
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(15, 23, 42, 0.8))',
              borderColor: 'rgba(56, 189, 248, 0.3)'
            }
          },
            h('div', { className: 'rea-card-header' },
              h('div', { className: 'rea-card-title' },
                'One MCP For Reverse Engineering Across Binaries, Applications, & Runtime'
              ),
              h('span', { className: 'rea-badge rea-badge-brand' }, 'rea-agents@6.8.0')
            ),
            h('div', { className: 'rea-card-desc' },
              'REA connects coding agents and developers to local reverse engineering tools. It allows an agent to inspect applications without source code, reconstruct algorithms, trace Electron IPC boundaries, analyze APKs, and build runnable RL environments from recorded network traffic.'
            ),
            h('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 } },
              h('div', { style: { flex: 1, minWidth: 260 } },
                h('div', { style: { fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 4 } }, 'AGENT SETUP COMMAND'),
                h('div', { className: 'rea-code-box' },
                  h('span', null, 'npx rea-agents@6.8.0 setup'),
                  h(CopyButton, { text: 'npx rea-agents@6.8.0 setup' })
                )
              ),
              h('div', { style: { flex: 1, minWidth: 260 } },
                h('div', { style: { fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 4 } }, 'GLOBAL CLI INSTALL'),
                h('div', { className: 'rea-code-box' },
                  h('span', null, 'npm install --global rea-agents@6.8.0'),
                  h(CopyButton, { text: 'npm install --global rea-agents@6.8.0' })
                )
              )
            )
          ),

          // 6.8.0 Highlights
          h('div', { className: 'rea-card' },
            h('div', { className: 'rea-card-header' },
              h('div', { className: 'rea-card-title' }, 'What\'s New in REA v6.8.0'),
              h('span', { className: 'rea-badge rea-badge-new' }, 'Highlights')
            ),
            h('ul', { className: 'rea-features-list' },
              h('li', null, h('strong', null, 'Agent RL Environments: '), 'Build local mock environments from network captures, browser sessions, or prompts; serve derived reads and evidence-gated writes.'),
              h('li', null, h('strong', null, 'Unity IL2CPP & Godot: '), 'Decode Unity global-metadata.dat versions 24, 27, 29, 31, and 39; extract Godot PCK archives (format 2, 3, 4).'),
              h('li', null, h('strong', null, 'GPU Code Objects: '), 'Static CUDA/HIP fatbin, CUBIN, and PTX inspection without GPU hardware.'),
              h('li', null, h('strong', null, 'Bytecode Formats: '), 'Inspect CPython pyc bytecode and Erlang BEAM chunks, atoms, exports, and lambdas offline.'),
              h('li', null, h('strong', null, 'PE/ELF & Kernel: '), 'Inspect Linux kernel module .modinfo, PE Authenticode certificates, PE delay-loads, and ELF notes without a heavy decompiler engine.'),
              h('li', null, h('strong', null, 'Retained Function Summaries: '), 'analyze_function now defaults to retained summaries for context efficiency; supply --detail complete when full dossiers are needed.')
            )
          ),

          // Architecture Cards
          h('div', { className: 'rea-grid' },
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-title' }, '🛡️ Complete Local Privacy'),
              h('div', { className: 'rea-card-desc' }, 'Analysis runs entirely on your local machine. No binaries or application payloads are ever uploaded to external servers.')
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-title' }, '🔍 Evidence-Based Deductions'),
              h('div', { className: 'rea-card-desc' }, 'Every finding includes cited assembly, cross-references, or offset facts. Unresolved or speculative data is explicitly marked as unknown.')
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-title' }, '⚙️ Pluggable Decompilers'),
              h('div', { className: 'rea-card-desc' }, 'Seamlessly bridges to Ghidra, Hopper, IDA Pro, Rizin/Cutter, or GNU objdump, with automatic fallback.')
            )
          )
        );
      } else if (activeTab === 'native') {
        tabContent = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          h('div', { className: 'rea-grid' },
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Decompilation Engines'),
                h('span', { className: 'rea-badge rea-badge-purple' }, 'Hopper / Ghidra / IDA')
              ),
              h('div', { className: 'rea-card-desc' },
                'Deep disassembly and pseudocode reconstruction for x86, x86_64, ARM, AArch64, MIPS, and PowerPC. Support for 16-bit DOS up to modern 64-bit binaries.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-binary ./target --provider ghidra'),
                h(CopyButton, { text: 'rea inspect-binary ./target --provider ghidra' })
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea analyze-function ./target sub_140001020 --detail complete'),
                h(CopyButton, { text: 'rea analyze-function ./target sub_140001020 --detail complete' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'PE / ELF / Mach-O Inspection'),
                h('span', { className: 'rea-badge rea-badge-brand' }, 'Engine-Free')
              ),
              h('div', { className: 'rea-card-desc' },
                'Inspect PE import hashes (imphash), delay-loads, Authenticode PKCS#7 signatures, ELF GNU build-id notes, and thin Mach-O universal slices.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-pe-imports ./target.exe --json'),
                h(CopyButton, { text: 'rea inspect-pe-imports ./target.exe --json' })
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-elf-notes ./target.elf --json'),
                h(CopyButton, { text: 'rea inspect-elf-notes ./target.elf --json' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Go & Rust Binary Metadata'),
                h('span', { className: 'rea-badge rea-badge-new' }, 'Compiler Signatures')
              ),
              h('div', { className: 'rea-card-desc' },
                'Extract embedded Go compiler version, module paths, and replacements. Audit Rust binaries via embedded cargo-auditable dependency edges.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-go-binary ./gobinary --json'),
                h(CopyButton, { text: 'rea inspect-go-binary ./gobinary --json' })
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-rust-binary ./rustbinary --json'),
                h(CopyButton, { text: 'rea inspect-rust-binary ./rustbinary --json' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'GPU Code Objects (v6.8.0)'),
                h('span', { className: 'rea-badge rea-badge-new' }, 'CUDA / HIP')
              ),
              h('div', { className: 'rea-card-desc' },
                'Static inspection of CUDA/HIP fatbinaries, CUBIN headers, kernel parameters, register allocation limits, and retained PTX assembly.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-gpu-object ./kernel.fatbin --json'),
                h(CopyButton, { text: 'rea inspect-gpu-object ./kernel.fatbin --json' })
              )
            )
          )
        );
      } else if (activeTab === 'apps') {
        tabContent = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          h('div', { className: 'rea-grid' },
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Electron & JavaScript Apps'),
                h('span', { className: 'rea-badge rea-badge-brand' }, 'ASAR & IPC')
              ),
              h('div', { className: 'rea-card-desc' },
                'Unpack and inspect ASAR bundles, trace IPC channels from preload scripts into the main process, examine Electron fuses, and map bundled chunks.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'npx -y rea-agents@6.8.0 analyze-javascript-application ./app --json'),
                h(CopyButton, { text: 'npx -y rea-agents@6.8.0 analyze-javascript-application ./app --json' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Unity IL2CPP Metadata (v6.8.0)'),
                h('span', { className: 'rea-badge rea-badge-new' }, 'Versions 24-39')
              ),
              h('div', { className: 'rea-card-desc' },
                'Static decoding of Unity global-metadata.dat across versions 24, 27, 29, 31, and 39. Reconstruct types, methods, fields, and export Ghidra seeds.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-il2cpp ./global-metadata.dat --detail complete'),
                h(CopyButton, { text: 'rea inspect-il2cpp ./global-metadata.dat --detail complete' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, '.NET Assemblies (CIL)'),
                h('span', { className: 'rea-badge rea-badge-purple' }, 'Managed Code')
              ),
              h('div', { className: 'rea-card-desc' },
                'Inspect .NET assembly metadata, CIL bytecode instructions, generic type parameters, and pinvoke native library dependencies.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-dotnet-assembly ./app.dll --json'),
                h(CopyButton, { text: 'rea inspect-dotnet-assembly ./app.dll --json' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Godot PCK & PyInstaller'),
                h('span', { className: 'rea-badge rea-badge-brand' }, 'Archive Extraction')
              ),
              h('div', { className: 'rea-card-desc' },
                'Unpack Godot PCK packages (format 2, 3, 4) without running Godot. Extract PyInstaller CArchive bytecode and identify Python version.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea extract-godot-pck ./game.pck --out ./extracted'),
                h(CopyButton, { text: 'rea extract-godot-pck ./game.pck --out ./extracted' })
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea extract-pyinstaller ./executable.exe --json'),
                h(CopyButton, { text: 'rea extract-pyinstaller ./executable.exe --json' })
              )
            )
          )
        );
      } else if (activeTab === 'mobile') {
        tabContent = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          h('div', { className: 'rea-grid' },
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'JADX Android Decompilation'),
                h('span', { className: 'rea-badge rea-badge-brand' }, 'DEX & Java')
              ),
              h('div', { className: 'rea-card-desc' },
                'Decompile APK/AAR into Java source using headless JADX. In 6.8.0, pass --string-tables-only to avoid large duplicate string payload overhead.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea decompile-apk ./app.apk --string-tables-only'),
                h(CopyButton, { text: 'rea decompile-apk ./app.apk --string-tables-only' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'APK Signature Verification'),
                h('span', { className: 'rea-badge rea-badge-new' }, 'v1, v2, v3, v3.1')
              ),
              h('div', { className: 'rea-card-desc' },
                'Verify JAR signing (v1), APK Signature Scheme v2/v3/v3.1, certificate SHA-256 fingerprints, key rotation lineage, and digest integrity.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-apk-signature ./app.apk --json'),
                h(CopyButton, { text: 'rea inspect-apk-signature ./app.apk --json' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Apktool & Resources'),
                h('span', { className: 'rea-badge rea-badge-purple' }, 'Manifest & Layouts')
              ),
              h('div', { className: 'rea-card-desc' },
                'Decode binary AndroidManifest.xml, string tables, compiled XML layouts, and drawables using caller-supplied Apktool launcher.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea decode-apk-resources ./app.apk --out ./res'),
                h(CopyButton, { text: 'rea decode-apk-resources ./app.apk --out ./res' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Live ADB Device Bridge & Flutter'),
                h('span', { className: 'rea-badge rea-badge-warn' }, 'Dynamic Device')
              ),
              h('div', { className: 'rea-card-desc' },
                'Inspect live Android hardware or emulators via ADB: installed packages, running processes, logcat, and dumpsys. Triage Flutter Dart snapshots.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-adb-device --json'),
                h(CopyButton, { text: 'rea inspect-adb-device --json' })
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-flutter-app ./app.apk --json'),
                h(CopyButton, { text: 'rea inspect-flutter-app ./app.apk --json' })
              )
            )
          )
        );
      } else if (activeTab === 'network') {
        tabContent = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          h('div', { className: 'rea-grid' },
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Packet Capture (PCAP / PCAPNG)'),
                h('span', { className: 'rea-badge rea-badge-brand' }, 'TShark 4.x')
              ),
              h('div', { className: 'rea-card-desc' },
                'Inspect recorded network packets, filter by Wireshark display expressions, extract conversation endpoints, TLS SNI, and protocol statistics.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-packet-capture ./capture.pcap --filter "http || dns"'),
                h(CopyButton, { text: 'rea inspect-packet-capture ./capture.pcap --filter "http || dns"' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Web Captures (HAR & SAZ)'),
                h('span', { className: 'rea-badge rea-badge-purple' }, 'HTTP Traffic')
              ),
              h('div', { className: 'rea-card-desc' },
                'Parse HTTP Archive (HAR) or Fiddler SAZ files, discover API endpoints, query parameter schemas, and reconstruct request/response bodies.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea analyze-web-capture ./session.har --json'),
                h(CopyButton, { text: 'rea analyze-web-capture ./session.har --json' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Headless Browser Observation'),
                h('span', { className: 'rea-badge rea-badge-new' }, 'Chrome CDP')
              ),
              h('div', { className: 'rea-card-desc' },
                'Drive headless Chrome to inspect live websites, capture network traffic, observe console errors and WebSocket frames, and grab screenshots.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea observe-browser https://target.app --screenshot'),
                h(CopyButton, { text: 'rea observe-browser https://target.app --screenshot' })
              )
            )
          )
        );
      } else if (activeTab === 'runtime') {
        tabContent = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          h('div', { className: 'rea-grid' },
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Frida Dynamic Hooking'),
                h('span', { className: 'rea-badge rea-badge-purple' }, 'Runtime Instrumentation')
              ),
              h('div', { className: 'rea-card-desc' },
                'Attach to running processes, inject JavaScript hooks, intercept function calls and return values, and trace arguments live.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea instrument-with-frida TargetApp -s hook.js --json'),
                h(CopyButton, { text: 'rea instrument-with-frida TargetApp -s hook.js --json' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'Crash Forensics & GDB'),
                h('span', { className: 'rea-badge rea-badge-warn' }, 'Core Dumps')
              ),
              h('div', { className: 'rea-card-desc' },
                'Analyze Linux ELF core dumps with pwntools/GDB; inspect faulting thread registers, signals, and Apple macOS/iOS .ips crash reports.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea analyze-crash-core ./core.dump --json'),
                h(CopyButton, { text: 'rea analyze-crash-core ./core.dump --json' })
              )
            ),
            h('div', { className: 'rea-card' },
              h('div', { className: 'rea-card-header' },
                h('div', { className: 'rea-card-title' }, 'WASM, EVM & SQLite'),
                h('span', { className: 'rea-badge rea-badge-brand' }, 'Bytecode & Data')
              ),
              h('div', { className: 'rea-card-desc' },
                'Disassemble WebAssembly artifacts with WABT; decode Ethereum EVM function selectors and dispatch tables; inspect offline SQLite WAL databases.'
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-wasm-artifact ./module.wasm --wat'),
                h(CopyButton, { text: 'rea inspect-wasm-artifact ./module.wasm --wat' })
              ),
              h('div', { className: 'rea-code-box' },
                h('span', null, 'rea inspect-evm-bytecode 0x608060405234801561001057...'),
                h(CopyButton, { text: 'rea inspect-evm-bytecode 0x608060405234801561001057...' })
              )
            )
          )
        );
      } else if (activeTab === 'environments') {
        tabContent = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          h('div', {
            className: 'rea-card',
            style: {
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.9))',
              borderColor: 'rgba(52, 211, 153, 0.3)'
            }
          },
            h('div', { className: 'rea-card-header' },
              h('div', { className: 'rea-card-title' }, '🤖 Build Local RL Environments With REA v6.8.0'),
              h('span', { className: 'rea-badge rea-badge-new' }, 'Major Feature')
            ),
            h('div', { className: 'rea-card-desc' },
              'Give your AI agent a local environment to practice tasks (such as listing items, creating records, deleting folders) without running or risking the original application. REA turns recorded API traffic and browser scenarios into runnable mock environments with evidence-gated writes for Reinforcement Learning (RL) or benchmark evaluations.'
            ),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 } },
              h('div', null,
                h('div', { style: { fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 4 } }, '1. BUILD ENVIRONMENT FROM RECORDED HAR'),
                h('div', { className: 'rea-code-box' },
                  h('span', null, 'rea environment-build ./session.har ./my-env --name my-env --json'),
                  h(CopyButton, { text: 'rea environment-build ./session.har ./my-env --name my-env --json' })
                )
              ),
              h('div', null,
                h('div', { style: { fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 4 } }, '2. RUN ENVIRONMENT SERVER WITH AGENTENV'),
                h('div', { className: 'rea-code-box' },
                  h('span', null, 'agent-env run ./my-env'),
                  h(CopyButton, { text: 'agent-env run ./my-env' })
                )
              ),
              h('div', null,
                h('div', { style: { fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 4 } }, '3. ASK CODEX / DEEPSEEK HARNESS AGENT'),
                h('div', { className: 'rea-prompt-box' },
                  h('span', null, 'Use REA to build an RL environment from my test web app at http://127.0.0.1:3000. Cover listing, creating, renaming, and deleting items. Save it in a folder named my-env.'),
                  h(CopyButton, { text: 'Use REA to build an RL environment from my test web app at http://127.0.0.1:3000. Cover listing, creating, renaming, and deleting items. Save it in a folder named my-env.' })
                )
              )
            )
          )
        );
      } else if (activeTab === 'triage') {
        tabContent = h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          h('div', { className: 'rea-card' },
            h('div', { className: 'rea-card-header' },
              h('div', { className: 'rea-card-title' }, '⚡ Interactive Target Triage & Command Builder'),
              h('span', { className: 'rea-badge rea-badge-brand' }, 'Live Helper')
            ),
            h('div', { className: 'rea-card-desc' },
              'Type or paste any target file path or artifact name below to see the recommended REA v6.8.0 analysis engine, CLI command, and agent prompt template.'
            ),
            h('input', {
              type: 'text',
              className: 'rea-input',
              placeholder: 'e.g. /path/to/app.asar, binary.elf, global-metadata.dat, traffic.pcap, target.apk, session.har',
              value: targetInput,
              onChange: (e) => setTargetInput(e.target.value)
            }),
            targetTriage ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                h('span', { className: 'rea-badge rea-badge-brand' }, targetTriage.badge),
                h('span', { style: { fontSize: 13, fontWeight: 600 } }, targetTriage.category),
                h('span', { style: { fontSize: 12, color: '#94a3b8' } }, `via ${targetTriage.engine}`)
              ),
              h('div', null,
                h('div', { style: { fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 4 } }, 'RECOMMENDED REA COMMAND'),
                h('div', { className: 'rea-code-box' },
                  h('span', null, targetTriage.command),
                  h(CopyButton, { text: targetTriage.command })
                )
              ),
              h('div', null,
                h('div', { style: { fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 4 } }, 'RECOMMENDED AGENT PROMPT'),
                h('div', { className: 'rea-prompt-box' },
                  h('span', null, targetTriage.prompt),
                  h(CopyButton, { text: targetTriage.prompt })
                )
              )
            ) : h('div', { style: { fontSize: 12, color: '#64748b', fontStyle: 'italic', marginTop: 4 } },
              'Try typing: "app.asar", "libgame.so", "global-metadata.dat", "network.pcap", "app.apk", or "session.har"'
            )
          )
        );
      }

      return h('div', { className: 'rea-panel-root' },
        header,
        navTabs,
        h('div', { className: 'rea-content' }, tabContent)
      );
    }

    /* ── Plugin Exports ─────────────────────────────────────────────────────── */
    return {
      inject: ['slots', 'layout', 'locale'],
      apply(ctx) {
        // 1. Register icon in sidebar.panellist
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: 'rea-tools',
          order: 25,
          label: () => (ctx.locale?.resolveText
            ? ctx.locale.resolveText({ en: 'Reverse Engineering', zh: '逆向工程' })
            : 'Reverse Engineering'),
        }, ReaSidebarIcon));

        // 2. Register main panel view in main keyed slot
        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: 'rea-tools',
        }, (props) => h(ReaPanel, {
          ...props,
          selectPanel: (id) => ctx.layout?.selectPanel(id)
        })));
      },
    };
  },
});
