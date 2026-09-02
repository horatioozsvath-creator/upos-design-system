/* @ds-bundle: {"format":4,"namespace":"SecondBrainDesignSystem_3cef5c","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"ICONS","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"DataRow","sourcePath":"components/data/DataRow.jsx"},{"name":"LegendPill","sourcePath":"components/data/LegendPill.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"TableHeader","sourcePath":"components/data/TableGrid.jsx"},{"name":"TableRow","sourcePath":"components/data/TableGrid.jsx"},{"name":"TableGrid","sourcePath":"components/data/TableGrid.jsx"},{"name":"Modal","sourcePath":"components/overlay/Modal.jsx"},{"name":"ModalBody","sourcePath":"components/overlay/Modal.jsx"},{"name":"Toast","sourcePath":"components/overlay/Toast.jsx"},{"name":"AiOpener","sourcePath":"components/shell/AiOpener.jsx"},{"name":"DarkPanel","sourcePath":"components/shell/DarkPanel.jsx"},{"name":"DarkPanelLabel","sourcePath":"components/shell/DarkPanel.jsx"},{"name":"DarkPanelRule","sourcePath":"components/shell/DarkPanel.jsx"},{"name":"RailItem","sourcePath":"components/shell/DarkPanel.jsx"},{"name":"NavItem","sourcePath":"components/shell/NavItem.jsx"},{"name":"SearchBar","sourcePath":"components/shell/SearchBar.jsx"},{"name":"SectionHead","sourcePath":"components/shell/SectionHead.jsx"},{"name":"Sidebar","sourcePath":"components/shell/Sidebar.jsx"},{"name":"SidebarBrand","sourcePath":"components/shell/Sidebar.jsx"},{"name":"SidebarUser","sourcePath":"components/shell/Sidebar.jsx"},{"name":"Ticker","sourcePath":"components/shell/Ticker.jsx"},{"name":"Card","sourcePath":"components/surface/Card.jsx"},{"name":"Inset","sourcePath":"components/surface/Card.jsx"},{"name":"Label","sourcePath":"components/surface/Card.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"05cae49839e7","components/core/Button.jsx":"1b87529c43f5","components/core/Chip.jsx":"de8c4011e315","components/core/Icon.jsx":"3192c219531b","components/core/IconButton.jsx":"9fba62286147","components/core/Input.jsx":"b27a842055a6","components/core/SegmentedControl.jsx":"5c756d87e81a","components/data/DataRow.jsx":"9c4db8998442","components/data/LegendPill.jsx":"4efbb90f77a3","components/data/ProgressBar.jsx":"9beca3c7c485","components/data/StatCard.jsx":"d374a3524c37","components/data/TableGrid.jsx":"84a8fff64acf","components/overlay/Modal.jsx":"951ad2824d6b","components/overlay/Toast.jsx":"b23712babe68","components/shell/AiOpener.jsx":"1f657ef0c694","components/shell/DarkPanel.jsx":"64037a555009","components/shell/NavItem.jsx":"0530e0b5b6c5","components/shell/SearchBar.jsx":"a32fa5e9dcee","components/shell/SectionHead.jsx":"f1b7ae774bc8","components/shell/Sidebar.jsx":"271fd01436d2","components/shell/Ticker.jsx":"8040fc4d7e23","components/surface/Card.jsx":"116840364449","ui_kits/secondbrain-desktop/Accounts.jsx":"49d1fee1fa2d","ui_kits/secondbrain-desktop/Catalog.jsx":"0de74d201a0e","ui_kits/secondbrain-desktop/Commissions.jsx":"26049732bdaf","ui_kits/secondbrain-desktop/DailyBrief.jsx":"6d0773f86d98","ui_kits/secondbrain-desktop/Overlays.jsx":"43c0df6e7fbd","ui_kits/secondbrain-desktop/Reports.jsx":"8de60d871753","ui_kits/secondbrain-desktop/Shell.jsx":"4d2168151dba","ui_kits/secondbrain-desktop/data.jsx":"9c0034f51b96","ui_kits/secondbrain-mobile/AndroidScreens.jsx":"efa8167cc5eb","ui_kits/secondbrain-mobile/IosScreens.jsx":"9b9bf3f5c7ad","ui_kits/secondbrain-mobile/android-frame.jsx":"cbf1bf9e56aa","ui_kits/secondbrain-mobile/ios-frame.jsx":"24642b887be3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SecondBrainDesignSystem_3cef5c = window.SecondBrainDesignSystem_3cef5c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  urgent,
  tone = 'onDark',
  children,
  style,
  ...rest
}) {
  if (children === '' || children == null) return null;
  const skin = urgent ? {
    background: 'var(--urgent)',
    color: '#fff'
  } : tone === 'onDark' ? {
    background: 'rgba(238,241,245,.1)',
    color: 'var(--ink-100-dark)'
  } : {
    background: 'var(--blue-chip-fill)',
    color: 'var(--slate-deep)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontSize: 10,
      fontWeight: 800,
      padding: '2px 8px',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.6,
      ...skin,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const PAD = {
  sm: '8px 16px',
  md: '11px 22px',
  lg: '13px 26px'
};
const FS = {
  sm: 11.5,
  md: 12,
  lg: 13
};
function Button({
  variant = 'primary',
  size = 'md',
  block,
  disabled,
  trailing,
  children,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: block ? 'space-between' : 'center',
    gap: 8,
    width: block ? '100%' : undefined,
    border: 0,
    borderRadius: 'var(--radius-pill)',
    padding: PAD[size],
    fontFamily: 'inherit',
    fontSize: FS[size],
    fontWeight: 800,
    letterSpacing: '.04em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--dur) var(--ease), box-shadow var(--dur), background var(--dur), border-color var(--dur), color var(--dur-fast)'
  };
  const lift = h && !disabled ? 'translateY(var(--lift-button))' : 'none';
  const skin = variant === 'primary' ? {
    background: 'var(--grad-primary)',
    color: '#fff',
    boxShadow: h && !disabled ? 'var(--shadow-button-hover)' : 'var(--shadow-button)',
    transform: lift
  } : variant === 'secondary' ? {
    background: h && !disabled ? 'var(--surface-hover-2)' : 'var(--surface)',
    color: '#2c353f',
    fontWeight: 700,
    border: '1px solid ' + (h && !disabled ? '#9dbdd8' : 'var(--border-soft)'),
    transform: lift
  } : {
    background: 'none',
    color: h && !disabled ? '#2c353f' : 'var(--ink-300)',
    fontWeight: 700,
    padding: size === 'sm' ? '6px 4px' : '8px 4px',
    letterSpacing: 0
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      ...base,
      ...skin,
      ...style
    }
  }, rest), children, trailing ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, trailing) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  blue: {
    background: 'var(--blue-chip-fill)',
    border: '1px solid var(--blue-chip-edge)',
    color: 'var(--slate-deep)'
  },
  neutral: {
    background: '#f1f4f8',
    border: '1px solid transparent',
    color: 'var(--ink-500)'
  },
  mono: {
    background: '#f1f4f8',
    border: '1px solid transparent',
    color: 'var(--ink-300)',
    fontFamily: 'var(--font-mono)',
    letterSpacing: 0,
    textTransform: 'none'
  },
  problem: {
    background: 'var(--problem-tint)',
    border: '1px solid var(--problem-edge)',
    color: 'var(--problem-text)'
  },
  healthy: {
    background: '#fff',
    border: '1px solid var(--healthy)',
    color: 'var(--healthy-text)'
  },
  stale: {
    background: '#fff',
    border: '1px solid var(--stale)',
    color: 'var(--stale-text)'
  },
  dormant: {
    background: '#fff',
    border: '1px solid var(--dormant)',
    color: 'var(--dormant-text)'
  },
  onDark: {
    background: 'rgba(143,201,255,.18)',
    border: '1px solid transparent',
    color: 'var(--sky-bright)'
  }
};
function Chip({
  tone = 'blue',
  dot,
  children,
  style,
  ...rest
}) {
  const skin = TONES[tone] || TONES.blue;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      borderRadius: 'var(--radius-pill)',
      padding: 'var(--pad-chip)',
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...skin,
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: dot,
      flex: 'none'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Path data lifted verbatim from the source build's inline SVGs (24x24 grid,
   Feather/Lucide geometry). Add a glyph only if the source defines it. */
const ICONS = {
  brief: ['M12 3a4 4 0 0 0-4 4 3.5 3.5 0 0 0-1 6.8V17a3 3 0 0 0 6 0V3z', 'M12 3a4 4 0 0 1 4 4 3.5 3.5 0 0 1 1 6.8V17a3 3 0 0 1-6 0'],
  accounts: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z', 'M14 14h7v7h-7z'],
  reminders: ['M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 0 1-3.46 0'],
  catalog: ['M9 6h12', 'M9 12h12', 'M9 18h12', 'M3 4h4v4H3z', 'M3 10h4v4H3z', 'M3 16h4v4H3z'],
  reports: ['M18 20V10', 'M12 20V4', 'M6 20v-6', 'M2 20h20'],
  commissions: ['M12 2v20', 'M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  manager: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8', 'M23 21v-2a4 4 0 0 0-3-3.87'],
  document: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M8 13h8', 'M8 17h8'],
  roadmap: ['M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z', 'M9 3v15', 'M15 6v15'],
  settings: ['M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'],
  search: ['M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0', 'M16.5 16.5 21 21'],
  chevronLeft: ['M15 18 9 12 15 6'],
  chevronRight: ['M9 18 15 12 9 6'],
  close: ['M18 6 6 18', 'M6 6 18 18']
};
function Icon({
  name,
  size = 17,
  weight = 1.7,
  style,
  ...rest
}) {
  const d = ICONS[name] || [];
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    style: {
      width: size,
      height: size,
      flex: 'none',
      display: 'block',
      stroke: 'currentColor',
      fill: 'none',
      strokeWidth: weight,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ...style
    }
  }, rest), d.map((p, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: p
  })));
}
Object.assign(__ds_scope, { ICONS, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function IconButton({
  size = 34,
  tone = 'light',
  spin,
  slide = 0,
  title,
  children,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  const dark = tone === 'dark';
  const t = [];
  if (h && spin) t.push('rotate(90deg)');
  if (h && slide) t.push('translateX(' + slide + 'px)');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    title: title,
    "aria-label": title,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: size,
      height: size,
      flex: 'none',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      border: '1px solid ' + (dark ? 'var(--border-on-dark)' : 'var(--border-soft)'),
      background: dark ? h ? 'var(--surface-dark-inset-hover)' : 'var(--surface-dark-inset)' : h ? 'var(--surface-hover)' : 'var(--surface-veil)',
      color: dark ? h ? '#fff' : 'var(--ink-200-dark)' : 'var(--ink-600)',
      transform: t.length ? t.join(' ') : 'none',
      transition: 'all var(--dur)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Input({
  align = 'left',
  strong,
  width,
  tone = 'default',
  defaultValue,
  value,
  onChange,
  placeholder,
  style,
  ...rest
}) {
  const [f, setF] = useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    defaultValue: defaultValue,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      height: 'var(--control-h)',
      width,
      minWidth: 0,
      border: '1px solid ' + (f ? 'var(--slate)' : 'var(--hairline)'),
      borderRadius: 'var(--radius-control)',
      background: f ? 'var(--surface)' : '#f9fbfd',
      padding: '0 11px',
      fontFamily: 'inherit',
      fontSize: 12.5,
      fontWeight: strong ? 800 : 400,
      textAlign: align,
      color: tone === 'value' ? 'var(--slate-deep)' : tone === 'rate' ? 'var(--slate-light)' : 'var(--ink-600)',
      outline: 'none',
      transition: 'all var(--dur-fast)',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SegmentedControl({
  options = [],
  value,
  onChange,
  tone = 'gradient',
  size = 'md',
  style,
  ...rest
}) {
  const pad = size === 'sm' ? '7px 14px' : size === 'lg' ? '9px 20px' : '8px 16px';
  const fs = size === 'sm' ? 11 : size === 'lg' ? 12 : 11.5;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-veil)',
      flexWrap: 'wrap',
      ...style
    }
  }, rest), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    const on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        border: 0,
        borderRadius: 'var(--radius-pill)',
        padding: pad,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: fs,
        fontWeight: 800,
        background: on ? tone === 'solid' ? 'var(--ink-800)' : 'var(--grad-primary)' : 'transparent',
        color: on ? '#fff' : 'var(--ink-600)',
        transition: 'all var(--dur)'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/data/DataRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function DataRow({
  columns = '1fr',
  status,
  tint,
  hover = true,
  onClick,
  children,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'grid',
      gridTemplateColumns: columns,
      gap: 16,
      alignItems: 'center',
      padding: 'var(--pad-row)',
      borderRadius: 'var(--radius-card-sm)',
      background: tint || 'var(--surface)',
      border: '1px solid ' + (status || 'transparent'),
      cursor: onClick ? 'pointer' : 'default',
      transform: hover && h ? 'translateY(var(--lift-row))' : 'none',
      boxShadow: hover && h ? 'var(--shadow-row-hover)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease), box-shadow var(--dur-slow), background var(--dur-slow)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { DataRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataRow.jsx", error: String((e && e.message) || e) }); }

// components/data/LegendPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function LegendPill({
  tone = 'healthy',
  children,
  style,
  ...rest
}) {
  const map = {
    healthy: {
      edge: 'var(--healthy)',
      dot: 'var(--healthy)',
      fg: 'var(--healthy-text)'
    },
    stale: {
      edge: 'var(--stale)',
      dot: 'var(--stale)',
      fg: 'var(--stale-text)'
    },
    dormant: {
      edge: 'var(--dormant)',
      dot: 'var(--sky-bright)',
      fg: 'var(--dormant-text)'
    },
    problem: {
      edge: 'var(--problem)',
      dot: 'var(--problem)',
      fg: 'var(--problem-text)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--surface)',
      border: '1px solid ' + map.edge,
      borderRadius: 'var(--radius-pill)',
      padding: 'var(--pad-pill)',
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      color: map.fg,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 'var(--radius-pill)',
      background: map.dot
    }
  }), children);
}
Object.assign(__ds_scope, { LegendPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LegendPill.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressBar({
  value = 0,
  fill = 'var(--grad-bar-sky)',
  height = 6,
  track = 'rgba(27,31,36,.1)',
  animate = true,
  segments,
  style,
  ...rest
}) {
  const parts = segments || [{
    w: typeof value === 'string' ? value : value + '%',
    fill
  }];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      height,
      borderRadius: 'var(--radius-pill)',
      background: track,
      overflow: 'hidden',
      display: 'flex',
      ...style
    }
  }, rest), parts.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: p.w,
      height,
      background: p.fill,
      transformOrigin: 'left',
      animation: animate && i === 0 ? 'fl-grow .9s cubic-bezier(.22,1,.36,1) both' : undefined
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  sm: {
    pad: '11px 14px',
    label: 9,
    value: 19,
    radius: 'var(--radius-inset)'
  },
  md: {
    pad: 'var(--pad-card-sm)',
    label: 9.5,
    value: 26,
    radius: 'var(--radius-card-sm)'
  },
  lg: {
    pad: '18px 20px',
    label: 9.5,
    value: 30,
    radius: 'var(--radius-card-sm)'
  }
};
function StatCard({
  label,
  value,
  note,
  color = 'var(--ink)',
  size = 'md',
  tone = 'card',
  hover = true,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  const s = SIZES[size];
  const bg = tone === 'inset' ? 'var(--surface-inset)' : tone === 'glass' ? 'rgba(255,255,255,.82)' : 'var(--surface)';
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      borderRadius: s.radius,
      background: bg,
      padding: s.pad,
      minWidth: 0,
      border: tone === 'glass' ? '1px solid rgba(27,31,36,.06)' : undefined,
      transform: hover && h ? 'translateY(var(--lift-card))' : 'none',
      boxShadow: hover && h ? 'var(--shadow-row-hover)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease), box-shadow var(--dur-slow)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: s.label,
      letterSpacing: '.15em',
      textTransform: 'uppercase',
      color: 'var(--text-label)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 800 + ' ' + s.value + 'px/1.1 var(--font-core)',
      marginTop: 9,
      letterSpacing: 'var(--track-value)',
      color
    }
  }, value), note ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text-label)',
      marginTop: 6
    }
  }, note) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/data/TableGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function TableHeader({
  columns,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: columns,
      gap: 12,
      padding: '14px 22px',
      background: 'var(--surface-inset)',
      fontSize: 9.5,
      fontWeight: 800,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--text-label)',
      ...style
    }
  }, rest), children);
}
function TableRow({
  columns,
  density = 'compact',
  first,
  onClick,
  children,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'grid',
      gridTemplateColumns: columns,
      gap: 12,
      alignItems: 'center',
      padding: (density === 'comfortable' ? '18px' : '12px') + ' 22px',
      fontSize: 12.5,
      cursor: onClick ? 'pointer' : 'default',
      borderTop: first ? 'none' : '1px solid var(--border-hair)',
      background: h ? 'var(--surface-hover)' : 'transparent',
      transition: 'background var(--dur-fast)',
      ...style
    }
  }, rest), children);
}
function TableGrid({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: 'var(--radius-panel-sm)',
      background: 'var(--surface)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { TableHeader, TableRow, TableGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TableGrid.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Modal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Modal({
  open,
  onClose,
  width = 1080,
  kicker,
  title,
  headerExtra,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 150,
      background: 'var(--scrim)',
      backdropFilter: 'var(--blur-scrim)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '40px 30px',
      overflow: 'auto',
      animation: 'fl-rise .3s ease both'
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(' + width + 'px, 100%)',
      borderRadius: 'var(--radius-panel)',
      background: 'var(--surface)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-modal)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 32px 22px',
      background: 'var(--grad-modal-header)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, kicker ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: 'var(--track-label-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-label)'
    }
  }, kicker) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 30px/1.05 var(--font-core)',
      letterSpacing: 'var(--track-page-title)',
      marginTop: 10
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(ModalClose, {
    onClose: onClose
  }))), headerExtra), children));
}
function ModalClose({
  onClose
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: onClose,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--radius-pill)',
      width: 36,
      height: 36,
      display: 'grid',
      placeItems: 'center',
      background: h ? 'var(--surface-hover)' : 'var(--surface)',
      cursor: 'pointer',
      color: 'var(--ink-500)',
      transform: h ? 'rotate(90deg)' : 'none',
      transition: 'all var(--dur)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    style: {
      width: 15,
      height: 15,
      stroke: 'currentColor',
      fill: 'none',
      strokeWidth: 2,
      strokeLinecap: 'round'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 6 18 18"
  })));
}
function ModalBody({
  columns,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: '24px 32px 32px',
      display: columns ? 'grid' : 'block',
      gridTemplateColumns: columns,
      gap: 24,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Modal, ModalBody });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Modal.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  open,
  message,
  actionLabel = 'Undo',
  onAction,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'fixed',
      bottom: 26,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      background: 'var(--surface-dark)',
      color: 'var(--text-on-dark)',
      padding: '14px 22px',
      borderRadius: 'var(--radius-pill)',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      fontSize: 13,
      boxShadow: 'var(--shadow-toast)',
      animation: 'fl-rise .35s cubic-bezier(.22,1,.36,1) both',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, message), onAction ? /*#__PURE__*/React.createElement(ToastAction, {
    label: actionLabel,
    onAction: onAction
  }) : null);
}
function ToastAction({
  label,
  onAction
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      border: 0,
      borderRadius: 'var(--radius-pill)',
      padding: '6px 14px',
      background: h ? 'rgba(238,241,245,.24)' : 'rgba(238,241,245,.14)',
      color: 'var(--sky-bright)',
      fontFamily: 'inherit',
      fontSize: 11.5,
      fontWeight: 800,
      cursor: 'pointer',
      transition: 'background var(--dur-fast)'
    }
  }, label);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Toast.jsx", error: String((e && e.message) || e) }); }

// components/shell/AiOpener.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AiOpener({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: '20px 22px',
      borderRadius: 'var(--radius-card)',
      background: 'var(--grad-primary)',
      color: '#fff',
      fontSize: 14.5,
      lineHeight: 1.6,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 18px 36px -22px rgba(34,73,106,1)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(100deg,transparent 30%,rgba(255,255,255,.14) 50%,transparent 70%)',
      backgroundSize: '320px 100%',
      animation: 'fl-sheen 5.5s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, children));
}
Object.assign(__ds_scope, { AiOpener });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/AiOpener.jsx", error: String((e && e.message) || e) }); }

// components/shell/DarkPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function DarkPanel({
  kicker,
  title,
  sticky,
  glow,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      borderRadius: 'var(--radius-panel)',
      background: 'var(--grad-dark-panel)',
      color: 'var(--text-on-dark)',
      padding: 'var(--pad-panel)',
      position: sticky ? 'sticky' : 'relative',
      top: sticky ? 'var(--space-page)' : undefined,
      maxHeight: sticky ? 'calc(100vh - 28px)' : undefined,
      overflow: sticky ? 'auto' : 'hidden',
      boxShadow: 'var(--shadow-dark-panel)',
      ...style
    }
  }, rest), glow ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-30% -40% auto auto',
      width: 280,
      height: 280,
      background: 'radial-gradient(circle,rgba(111,163,207,.28),rgba(111,163,207,0) 70%)',
      animation: 'fl-drift 18s ease-in-out infinite',
      pointerEvents: 'none'
    }
  }) : null, kicker ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: 'var(--track-label-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-on-dark-label)',
      position: 'relative'
    }
  }, kicker) : null, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 22px/1.15 var(--font-core)',
      marginTop: 9,
      letterSpacing: '-.02em',
      position: 'relative'
    }
  }, title) : null, children);
}
function DarkPanelLabel({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--text-on-dark-label)',
      ...style
    }
  }, children);
}
function DarkPanelRule({
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'rgba(238,241,245,.16)',
      margin: '18px 0',
      ...style
    }
  });
}
function RailItem({
  arrow,
  slide = true,
  children,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      gap: 10,
      borderRadius: 'var(--radius-inset)',
      padding: '12px 14px',
      fontSize: 12.5,
      lineHeight: 1.5,
      background: h ? 'var(--surface-dark-inset-hover)' : 'var(--surface-dark-inset)',
      transform: h && slide ? 'translateX(var(--slide-list))' : 'none',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background var(--dur), transform var(--dur)',
      ...style
    }
  }, rest), arrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--sky-bright)',
      fontWeight: 800
    }
  }, "\u2192") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, children));
}
Object.assign(__ds_scope, { DarkPanel, DarkPanelLabel, DarkPanelRule, RailItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/DarkPanel.jsx", error: String((e && e.message) || e) }); }

// components/shell/NavItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function NavItem({
  icon,
  label,
  badge,
  badgeUrgent,
  active,
  collapsed,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    title: label,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      textAlign: 'left',
      padding: collapsed ? '11px 0' : '11px 14px',
      justifyContent: collapsed ? 'center' : undefined,
      border: 0,
      borderRadius: 'var(--radius-nav)',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 12.5,
      fontWeight: 700,
      letterSpacing: '.01em',
      background: active ? 'var(--grad-primary)' : h ? 'rgba(238,241,245,.1)' : 'transparent',
      color: active ? '#fff' : h ? '#fff' : 'var(--ink-100-dark)',
      boxShadow: active ? '0 12px 24px -14px rgba(34,73,106,1)' : 'none',
      transform: h && !active ? 'translateX(var(--slide-list))' : 'none',
      transition: 'background var(--dur) var(--ease), color var(--dur), transform var(--dur), box-shadow var(--dur)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: 'none',
      display: 'grid',
      placeItems: 'center'
    }
  }, icon), collapsed ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    }
  }, label), collapsed || !badge ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      padding: '2px 8px',
      borderRadius: 'var(--radius-pill)',
      background: badgeUrgent ? 'var(--urgent)' : 'rgba(238,241,245,.1)',
      color: badgeUrgent ? '#fff' : 'var(--ink-100-dark)'
    }
  }, badge));
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/shell/SearchBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SearchBar({
  placeholder,
  icon,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--surface-glass)',
      backdropFilter: 'var(--blur-glass)',
      border: '1px solid rgba(255,255,255,.9)',
      borderRadius: 'var(--radius-pill)',
      padding: '11px 18px',
      boxShadow: 'var(--shadow-glass)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#7e8894',
      display: 'grid',
      placeItems: 'center',
      flex: 'none'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ink-300)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, placeholder)), action);
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/shell/SectionHead.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHead({
  kicker,
  title,
  caption,
  action,
  level = 'page',
  style,
  ...rest
}) {
  const isPage = level === 'page';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      padding: isPage ? '0 6px' : 0,
      ...style
    }
  }, rest), kicker ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: isPage ? 10 : 9.5,
      letterSpacing: 'var(--track-label-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-label)'
    }
  }, kicker) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: isPage ? 'flex-end' : 'baseline',
      gap: 16,
      marginTop: kicker ? 8 : 0,
      flexWrap: 'wrap'
    }
  }, isPage ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      letterSpacing: 'var(--track-page-title)'
    }
  }, title) : /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 'var(--size-section-head)',
      letterSpacing: 'var(--track-section-head)'
    }
  }, title), caption ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: isPage ? 13 : 10,
      letterSpacing: isPage ? 0 : '.16em',
      textTransform: isPage ? 'none' : 'uppercase',
      color: 'var(--text-label)'
    }
  }, caption) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, action) : null));
}
Object.assign(__ds_scope, { SectionHead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/SectionHead.jsx", error: String((e && e.message) || e) }); }

// components/shell/Sidebar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Sidebar({
  collapsed,
  children,
  footer,
  header,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({
    style: {
      width: collapsed ? 'var(--sidebar-w-min)' : 'var(--sidebar-w)',
      background: 'var(--grad-dark-panel)',
      color: 'var(--text-on-dark)',
      borderRadius: 'var(--radius-panel-sm)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 'var(--space-page)',
      height: 'calc(100vh - 28px)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sidebar)',
      transition: 'width var(--dur-slower) var(--ease)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-40% -60% auto auto',
      width: 320,
      height: 320,
      background: 'radial-gradient(circle,rgba(111,163,207,.34),rgba(111,163,207,0) 70%)',
      animation: 'fl-drift 14s ease-in-out infinite',
      pointerEvents: 'none'
    }
  }), header, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      padding: '6px 10px',
      gap: 3,
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      position: 'relative'
    }
  }, children), footer);
}
function SidebarBrand({
  collapsed,
  monogram = 'SB',
  name = 'SecondBrain',
  kicker = 'AI sales intelligence',
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 18px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-nav)',
      flex: 'none',
      background: 'var(--grad-primary-soft)',
      display: 'grid',
      placeItems: 'center',
      font: '800 13px var(--font-core)',
      color: '#fff',
      boxShadow: '0 6px 16px -6px rgba(42,85,120,.9)'
    }
  }, monogram), collapsed ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 15px/1 var(--font-core)',
      letterSpacing: '-.02em'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'var(--ink-200-dark)',
      marginTop: 5
    }
  }, kicker)), action));
}
function SidebarUser({
  collapsed,
  initials = 'HO',
  name,
  role,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-pill)',
      flex: 'none',
      background: 'linear-gradient(140deg,#5a636d,#39424c)',
      display: 'grid',
      placeItems: 'center',
      font: '800 10.5px var(--font-core)'
    }
  }, initials), collapsed ? null : /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--ink-200-dark)',
      marginTop: 2
    }
  }, role)));
}
Object.assign(__ds_scope, { Sidebar, SidebarBrand, SidebarUser });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/shell/Ticker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Ticker({
  label = 'Up next',
  items = [],
  seconds = 42,
  style,
  ...rest
}) {
  const loop = items.concat(items);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-dark)',
      color: 'var(--text-on-dark)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      height: 'var(--ticker-h)',
      boxShadow: 'var(--shadow-ticker)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '0 18px 0 20px',
      height: '100%',
      background: 'var(--grad-primary)',
      borderRadius: '999px 0 0 999px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--sky-bright)',
      animation: 'fl-pulse 1.6s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: '.18em',
      textTransform: 'uppercase'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      maskImage: 'linear-gradient(90deg,transparent,#000 40px,#000 calc(100% - 40px),transparent)',
      WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 40px,#000 calc(100% - 40px),transparent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      width: 'max-content',
      animation: 'fl-marquee ' + seconds + 's linear infinite'
    }
  }, loop.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 24px',
      whiteSpace: 'nowrap',
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 'var(--radius-pill)',
      background: t.dot,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: t.dot
    }
  }, t.when), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#cfd6de'
    }
  }, t.text))))));
}
Object.assign(__ds_scope, { Ticker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/Ticker.jsx", error: String((e && e.message) || e) }); }

// components/surface/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const RADII = {
  panel: 'var(--radius-panel)',
  panelSm: 'var(--radius-panel-sm)',
  card: 'var(--radius-card)',
  cardSm: 'var(--radius-card-sm)',
  inset: 'var(--radius-inset)'
};
function Card({
  radius = 'card',
  tone = 'white',
  pad = 'var(--pad-card)',
  lift,
  glow,
  children,
  style,
  ...rest
}) {
  const [h, setH] = useState(false);
  const bg = tone === 'gradient' ? 'var(--grad-card-light)' : tone === 'veil' ? 'var(--surface-veil)' : tone === 'inset' ? 'var(--surface-inset)' : 'var(--surface)';
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      borderRadius: RADII[radius] || radius,
      background: bg,
      padding: pad,
      boxShadow: tone === 'veil' || tone === 'inset' ? 'none' : h && lift ? 'var(--shadow-card-deep)' : 'var(--shadow-card)',
      transform: h && lift ? 'translateY(var(--lift-card))' : 'none',
      position: 'relative',
      overflow: glow ? 'hidden' : undefined,
      transition: 'transform var(--dur-slow) var(--ease), box-shadow var(--dur-slow)',
      ...style
    }
  }, rest), glow ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -140,
      right: -90,
      width: 340,
      height: 340,
      borderRadius: 999,
      background: 'radial-gradient(circle,rgba(111,163,207,.28),rgba(111,163,207,0) 70%)',
      animation: 'fl-drift 18s ease-in-out infinite',
      pointerEvents: 'none'
    }
  }) : null, children);
}
function Inset({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: 'var(--radius-inset)',
      background: 'var(--surface-inset)',
      padding: 'var(--pad-inset)',
      ...style
    }
  }, rest), children);
}
function Label({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontSize: 9.5,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--text-label)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card, Inset, Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surface/Card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-desktop/Accounts.jsx
try { (() => {
const NS2 = window.SecondBrainDesignSystem_3cef5c;
function Accounts({
  onOpenAccount
}) {
  const {
    SectionHead,
    SegmentedControl,
    TableGrid,
    TableHeader,
    TableRow,
    Button,
    Card
  } = NS2;
  const [density, setDensity] = React.useState('Compact');
  const [filter, setFilter] = React.useState('All 183');
  const FILTERS = ['All 183', 'At risk 42', 'No order 90d+', 'Healthy'];
  const COLS = '100px 1fr 120px 90px 90px 110px 120px 120px';
  const rows = filter === 'Healthy' ? [] : window.ACCOUNTS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 28
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Book of business",
    title: "My Accounts",
    action: /*#__PURE__*/React.createElement(SegmentedControl, {
      tone: "solid",
      options: ['Compact', 'Comfortable'],
      value: density,
      onChange: setDensity
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      margin: '14px 0',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 240,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-glass)',
      padding: '11px 18px',
      fontSize: 13,
      color: 'var(--ink-300)',
      border: '1px solid rgba(255,255,255,.9)'
    }
  }, "Search accounts, sector, software, rep\u2026"), FILTERS.map(f => /*#__PURE__*/React.createElement(Button, {
    key: f,
    variant: f === filter ? 'primary' : 'secondary',
    size: "sm",
    onClick: () => setFilter(f)
  }, f))), /*#__PURE__*/React.createElement(TableGrid, null, /*#__PURE__*/React.createElement(TableHeader, {
    columns: COLS
  }, /*#__PURE__*/React.createElement("div", null, "Account #"), /*#__PURE__*/React.createElement("div", null, "Account"), /*#__PURE__*/React.createElement("div", null, "Sector"), /*#__PURE__*/React.createElement("div", null, "Score"), /*#__PURE__*/React.createElement("div", null, "Tickets"), /*#__PURE__*/React.createElement("div", null, "Last order"), /*#__PURE__*/React.createElement("div", null, "Follow-up"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Value")), rows.map((r, i) => /*#__PURE__*/React.createElement(TableRow, {
    key: r.id,
    columns: COLS,
    first: i === 0,
    density: density === 'Comfortable' ? 'comfortable' : 'compact',
    onClick: () => onOpenAccount(r)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--ink-300)'
    }
  }, r.id), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-500)'
    }
  }, r.sector), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      color: r.score < 35 ? 'var(--problem-text)' : ['var(--value-1)', 'var(--value-2)', 'var(--value-3)', 'var(--value-4)'][i % 4]
    }
  }, r.score), /*#__PURE__*/React.createElement("div", {
    style: {
      color: r.tickets > 3 ? 'var(--problem-text)' : 'var(--ink-600)'
    }
  }, r.tickets), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-500)'
    }
  }, r.lastOrder), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: 'var(--problem-text)'
    }
  }, r.overdue), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontWeight: 800
    }
  }, r.value))), rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '44px 26px',
      background: 'var(--surface-inset)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 18px var(--font-core)',
      letterSpacing: '-.02em'
    }
  }, "No healthy accounts in your book"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--ink-500)',
      marginTop: 9,
      maxWidth: 520,
      lineHeight: 1.6
    }
  }, "Every account has either dropped off in revenue, gone 60+ days without contact, or has open tickets. Start with the five the brain picked this morning."), /*#__PURE__*/React.createElement(Button, {
    style: {
      marginTop: 18
    },
    onClick: () => setFilter('All 183')
  }, "Back to all accounts \u2192")) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 12,
      color: 'var(--ink-300)',
      padding: '0 6px'
    }
  }, "Showing ", rows.length, " of 183 \xB7 sorted by follow-up age"));
}
Object.assign(window, {
  Accounts
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-desktop/Accounts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-desktop/Catalog.jsx
try { (() => {
const NS3 = window.SecondBrainDesignSystem_3cef5c;
function Catalog({
  onOpenItem
}) {
  const {
    SectionHead,
    LegendPill,
    DataRow,
    Chip,
    Button
  } = NS3;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 28
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Every item sold, across every customer",
    title: "Master Catalog",
    caption: "217 items matching \u201Cepson\u201D \xB7 page 1 of 3"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      margin: '18px 0 14px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 200,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface)',
      padding: '11px 20px',
      fontSize: 13,
      fontWeight: 800,
      boxShadow: '0 10px 26px -20px rgba(27,31,36,.6)'
    }
  }, "epson"), ['Category', 'Item type', 'Status'].map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface)',
      border: '1px solid var(--hairline)',
      padding: '11px 18px',
      fontSize: 12.5,
      color: 'var(--ink-600)'
    }
  }, f, " \u25BE")), /*#__PURE__*/React.createElement(Button, null, "Search")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      margin: '0 6px 14px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(LegendPill, {
    tone: "healthy"
  }, "Ordered in last 18 months"), /*#__PURE__*/React.createElement(LegendPill, {
    tone: "stale"
  }, "Discontinued"), /*#__PURE__*/React.createElement(LegendPill, {
    tone: "dormant"
  }, "Dormant 18+ months")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, window.CATALOG.map(c => {
    const s = window.catalogStatus(c);
    return /*#__PURE__*/React.createElement(DataRow, {
      key: c.part,
      columns: "1fr 140px 130px 130px",
      status: s.edge,
      onClick: () => onOpenItem(c, s)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 800
      }
    }, c.name), /*#__PURE__*/React.createElement(Chip, null, c.type), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        fontWeight: 800,
        color: s.flagColor
      }
    }, s.flag)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11.5,
        color: 'var(--ink-600)',
        marginTop: 5
      }
    }, c.part, " \xB7 ", c.customers, " customers \xB7 ", c.units, " sold \xB7 last ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: s.lastColor
      }
    }, c.last))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--ink-400)'
      }
    }, "Retail ", c.retail), /*#__PURE__*/React.createElement("div", {
      style: {
        font: '800 18px var(--font-core)',
        letterSpacing: '-.02em',
        color: 'var(--slate-deep)'
      }
    }, c.price), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right',
        fontSize: 12.5,
        color: 'var(--slate-light)',
        fontWeight: 700
      }
    }, c.total));
  })));
}
Object.assign(window, {
  Catalog
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-desktop/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-desktop/Commissions.jsx
try { (() => {
const NS5 = window.SecondBrainDesignSystem_3cef5c;
function Commissions() {
  const {
    SectionHead,
    SegmentedControl,
    StatCard,
    Card,
    Label,
    Inset,
    DataRow,
    DarkPanel,
    DarkPanelLabel,
    RailItem,
    ProgressBar
  } = NS5;
  const [year, setYear] = React.useState('2026');
  const [open, setOpen] = React.useState('jun');
  const [order, setOrder] = React.useState(null);
  const money = window.money;
  const F = {
    '2026': 1,
    '2025': 0.86,
    '2024': 0.71
  }[year];
  const RATE = window.COMM_RATE;
  const months = window.COMM_MONTHS.map((m, mi) => {
    const rev = m.rev * F,
      cost = m.cost * F,
      margin = rev - cost;
    const weights = mi % 3 === 0 ? [0.55, 0.3, 0.15] : [0.62, 0.38];
    const orders = weights.map((w, oi) => {
      const oRev = rev * w,
        oCost = cost * w,
        oMargin = oRev - oCost;
      const id = '#12' + (6000 + mi * 17 + oi * 3);
      return {
        id,
        account: window.COMM_ACCOUNTS[(mi + oi) % window.COMM_ACCOUNTS.length],
        retail: money(oRev),
        cost: money(oCost),
        margin: money(oMargin),
        commission: money(oMargin * RATE),
        lines: [0.6, 0.4].map((lw, li) => {
          const p = window.COMM_PARTS[(mi + oi * 2 + li) % window.COMM_PARTS.length];
          return {
            name: p[0],
            part: p[1],
            qty: String(2 + (mi + li) % 5),
            retail: money(oRev * lw),
            cost: money(oCost * lw),
            margin: money((oRev - oCost) * lw)
          };
        })
      };
    });
    return {
      ...m,
      revenue: money(rev),
      costs: money(cost),
      margin: money(margin),
      commission: money(margin * RATE),
      rate: '6.5%',
      orders
    };
  });
  const total = months.reduce((a, m) => ({
    rev: a.rev + m.rev * F,
    cost: a.cost + m.cost * F
  }), {
    rev: 0,
    cost: 0
  });
  const totalMargin = total.rev - total.cost;
  const COLS = '120px 1fr 1fr 1fr 70px 1fr 108px';
  const statusColor = s => s === 'Paid' ? 'var(--healthy-text)' : s === 'Approved' ? 'var(--slate)' : 'var(--stale-text)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 28
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Commissions \xB7 paid on gross margin (retail \u2212 cost)",
    title: "Commissions",
    action: /*#__PURE__*/React.createElement(SegmentedControl, {
      tone: "solid",
      size: "sm",
      options: ['2026', '2025', '2024'],
      value: year,
      onChange: setYear
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 9,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Revenue",
    value: money(total.rev),
    note: "pre-tax subtotal",
    color: "var(--value-1)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Cost",
    value: money(total.cost),
    note: "unit cost only",
    color: "var(--value-2)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Gross margin",
    value: money(totalMargin),
    note: "commission basis",
    color: "var(--value-3)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Rate",
    value: "6.5%",
    note: "flat, with 4 overrides",
    color: "var(--value-4)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Commission YTD",
    value: money(totalMargin * RATE),
    note: "3 payouts scheduled",
    color: "var(--teal-blue)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 330px',
      gap: 16,
      alignItems: 'start',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    radius: "panelSm",
    pad: "24px 26px",
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    level: "section",
    title: year + ' by month',
    caption: "Tap a month to see its orders"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: COLS,
      gap: 12,
      padding: '11px 16px',
      borderRadius: 'var(--radius-inset-sm)',
      background: 'var(--surface-inset)',
      marginTop: 16,
      fontSize: 9.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--text-label)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Month"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Revenue"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Cost"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Gross margin"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Rate"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Commission"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Status")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 9
    }
  }, months.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.key
  }, /*#__PURE__*/React.createElement(DataRow, {
    columns: COLS,
    status: m.key === open ? 'var(--slate)' : 'var(--hairline)',
    style: {
      gap: 12,
      padding: '15px 16px',
      borderRadius: 'var(--radius-card-sm)'
    },
    onClick: () => setOpen(open === m.key ? null : m.key)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: statusColor(m.status),
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 800,
      letterSpacing: '-.01em'
    }
  }, m.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 13,
      color: 'var(--ink-600)'
    }
  }, m.revenue), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 13,
      color: 'var(--ink-300)'
    }
  }, m.costs), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      font: '800 15px/1 var(--font-core)',
      letterSpacing: '-.02em',
      color: 'var(--slate-deep)'
    }
  }, m.margin), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12,
      fontWeight: 800,
      color: 'var(--slate-light)'
    }
  }, m.rate), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      font: '800 16px/1 var(--font-core)',
      letterSpacing: '-.02em',
      color: 'var(--teal-blue)'
    }
  }, m.commission), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 10.5,
      fontWeight: 800,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: statusColor(m.status)
    }
  }, m.status)), open === m.key ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-card-sm)',
      background: 'var(--surface-inset)',
      padding: '14px 16px',
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      animation: 'fl-rise .35s cubic-bezier(.22,1,.36,1) both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr 100px 100px 100px 100px',
      gap: 12,
      padding: '0 12px',
      fontSize: 9,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--text-label)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Order"), /*#__PURE__*/React.createElement("div", null, "Account"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Retail"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Cost"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Margin"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Commission")), m.orders.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      setOrder(order === o.id ? null : o.id);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr 100px 100px 100px 100px',
      gap: 12,
      alignItems: 'center',
      padding: '13px 12px',
      borderRadius: 'var(--radius-inset-sm)',
      background: 'var(--surface)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--ink-600)'
    }
  }, o.id), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      letterSpacing: '-.01em',
      minWidth: 0
    }
  }, o.account), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12,
      color: 'var(--ink-600)'
    }
  }, o.retail), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12,
      color: 'var(--ink-300)'
    }
  }, o.cost), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12.5,
      fontWeight: 800,
      color: 'var(--slate-deep)'
    }
  }, o.margin), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12.5,
      fontWeight: 800,
      color: 'var(--teal-blue)'
    }
  }, o.commission)), order === o.id ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-inset-sm)',
      background: 'var(--surface-hover-2)',
      padding: '12px 14px',
      marginTop: 7,
      animation: 'fl-rise .3s cubic-bezier(.22,1,.36,1) both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 60px 90px 90px 90px',
      gap: 12,
      padding: '0 6px',
      fontSize: 9,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: '#7b93ad'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Line item"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Qty"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Retail"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Cost"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, "Margin")), o.lines.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.part,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 60px 90px 90px 90px',
      gap: 12,
      alignItems: 'center',
      padding: '9px 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '-.01em'
    }
  }, l.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--ink-300)',
      marginTop: 3
    }
  }, l.part)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12,
      color: 'var(--ink-600)'
    }
  }, l.qty), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12,
      color: 'var(--ink-600)'
    }
  }, l.retail), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12,
      color: 'var(--ink-300)'
    }
  }, l.cost), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12,
      fontWeight: 800,
      color: 'var(--slate-deep)'
    }
  }, l.margin)))) : null))) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: COLS,
      gap: 12,
      alignItems: 'center',
      padding: 16,
      borderRadius: 'var(--radius-card-sm)',
      background: 'var(--grad-primary)',
      color: '#fff',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: '#c8ddf2'
    }
  }, "Year to date"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 13,
      color: '#dce8f4'
    }
  }, money(total.rev)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 13,
      color: '#a9c6e0'
    }
  }, money(total.cost)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      font: '800 17px/1 var(--font-core)',
      letterSpacing: '-.02em'
    }
  }, money(totalMargin)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12,
      fontWeight: 800,
      color: 'var(--sky-bright)'
    }
  }, "6.5%"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      font: '800 19px/1 var(--font-core)',
      letterSpacing: '-.03em',
      color: 'var(--on-dark-green)'
    }
  }, money(totalMargin * RATE)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 10.5,
      fontWeight: 800,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: '#c8ddf2'
    }
  }, "Open"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Card, {
    pad: "20px 22px"
  }, /*#__PURE__*/React.createElement(Label, null, "Your rate card"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 32px/1 var(--font-core)',
      letterSpacing: '-.03em',
      color: 'var(--slate-deep)'
    }
  }, "6.5%"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-500)'
    }
  }, "flat, on gross margin")), /*#__PURE__*/React.createElement(Label, {
    style: {
      marginTop: 18
    }
  }, "Account overrides"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      marginTop: 10
    }
  }, window.COMM_OVERRIDES.map(ov => /*#__PURE__*/React.createElement(Inset, {
    key: ov.account,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '11px 13px',
      borderRadius: 'var(--radius-inset-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '-.01em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, ov.account), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--ink-300)',
      marginTop: 3
    }
  }, ov.note)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      flex: 'none',
      font: '800 15px/1 var(--font-core)',
      letterSpacing: '-.02em',
      color: ov.color
    }
  }, ov.rate))))), /*#__PURE__*/React.createElement(Card, {
    pad: "20px 22px",
    style: {
      boxShadow: 'none'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Expenses \u2014 tracked, not deducted"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      marginTop: 12
    }
  }, [['Travel — Vancouver Island loop', '$1,284'], ['Trade show — Grocery Innovations', '$2,900'], ['Customer lunches', '$418'], ['Demo hardware, written down', '$1,150']].map(e => /*#__PURE__*/React.createElement(Inset, {
    key: e[0],
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '11px 13px',
      borderRadius: 'var(--radius-inset-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--ink-700)'
    }
  }, e[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 12.5,
      fontWeight: 800,
      color: 'var(--slate-light)'
    }
  }, e[1])))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ink-300)',
      marginTop: 12,
      lineHeight: 1.55
    }
  }, "Expenses sit against the account, not the commission basis. Accounting reconciles them monthly.")), /*#__PURE__*/React.createElement(DarkPanel, {
    style: {
      borderRadius: 'var(--radius-card)',
      padding: '20px 22px'
    }
  }, /*#__PURE__*/React.createElement(DarkPanelLabel, null, "Payout schedule"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      marginTop: 12
    }
  }, window.COMM_PAYOUTS.map(p => /*#__PURE__*/React.createElement(RailItem, {
    key: p.when,
    slide: false,
    style: {
      flexDirection: 'column',
      borderRadius: 'var(--radius-inset-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800
    }
  }, p.when), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      font: '800 15px/1 var(--font-core)',
      letterSpacing: '-.02em',
      color: p.color
    }
  }, p.value)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: 'var(--text-on-dark-label)',
      marginTop: 6
    }
  }, p.note))))))));
}
Object.assign(window, {
  Commissions
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-desktop/Commissions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-desktop/DailyBrief.jsx
try { (() => {
const NS = window.SecondBrainDesignSystem_3cef5c;
function DailyBrief({
  onOpenAccount,
  onLog
}) {
  const {
    Card,
    Inset,
    Label,
    StatCard,
    SectionHead,
    AiOpener,
    DarkPanel,
    DarkPanelLabel,
    DarkPanelRule,
    RailItem,
    Button,
    IconButton,
    Icon,
    ProgressBar,
    Chip
  } = NS;
  const [i, setI] = React.useState(0);
  const card = window.QUEUE[i];
  const rest = window.QUEUE.filter((_, n) => n !== i);
  const step = d => setI(v => (v + d + window.QUEUE.length) % window.QUEUE.length);
  const VAL = ['var(--value-1)', 'var(--value-2)', 'var(--value-3)', 'var(--value-4)'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: 16,
      alignItems: 'start',
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    radius: "panel",
    tone: "gradient",
    pad: "var(--pad-hero)",
    glow: true,
    style: {
      animation: 'fl-rise .6s cubic-bezier(.22,1,.36,1) both'
    }
  }, /*#__PURE__*/React.createElement(Label, {
    style: {
      fontSize: 10,
      letterSpacing: 'var(--track-label-wide)',
      position: 'relative'
    }
  }, "Wednesday 6 August \xB7 183 accounts"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-hero)',
      letterSpacing: 'var(--track-hero)',
      marginTop: 14,
      maxWidth: 760,
      position: 'relative',
      textWrap: 'pretty'
    }
  }, "Five calls stand between you and ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--grad-headline-accent)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, "$616,000"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 24,
      flexWrap: 'wrap',
      position: 'relative'
    }
  }, [['Revenue at risk', '$616,000', 'var(--problem-text)'], ['In the queue', '5', 'var(--value-1)'], ['Cleared today', '3 / 8', 'var(--healthy-text)'], ['Reorders overdue', '$24,090', 'var(--value-3)'], ['Renewals ≤ 90d', '26', 'var(--value-4)']].map(s => /*#__PURE__*/React.createElement(StatCard, {
    key: s[0],
    tone: "glass",
    label: s[0],
    value: s[1],
    color: s[2],
    style: {
      flex: 1,
      minWidth: 150,
      padding: '14px 18px'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '0 6px'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 21,
      letterSpacing: '-.02em'
    }
  }, "The queue"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 5
    }
  }, window.QUEUE.map((_, n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      width: n === i ? 26 : 10,
      height: 6,
      borderRadius: 999,
      background: n === i ? 'var(--grad-primary)' : 'rgba(27,31,36,.16)',
      transition: 'all .4s var(--ease)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--ink-300)'
    }
  }, i + 1, " of ", window.QUEUE.length, " \xB7 $616K at stake"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    title: "Previous",
    slide: -2,
    onClick: () => step(-1)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 15,
    weight: 2
  })), /*#__PURE__*/React.createElement(IconButton, {
    title: "Next",
    slide: 2,
    onClick: () => step(1)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 15,
    weight: 2
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-panel)',
      background: 'var(--surface)',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '1.42fr 1fr',
      boxShadow: 'var(--shadow-card-deep)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 28px/1.05 var(--font-core)',
      letterSpacing: 'var(--track-page-title)'
    }
  }, card.name), /*#__PURE__*/React.createElement(Chip, {
    tone: "mono"
  }, card.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-500)',
      marginTop: 8
    }
  }, card.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 20,
      flexWrap: 'wrap'
    }
  }, card.stats.map((st, n) => /*#__PURE__*/React.createElement(StatCard, {
    key: st.label,
    size: "sm",
    tone: "inset",
    hover: false,
    label: st.label,
    value: st.value,
    color: VAL[n % 4],
    style: {
      flex: 1,
      minWidth: 110
    }
  }))), /*#__PURE__*/React.createElement(Label, {
    style: {
      letterSpacing: '.18em',
      marginTop: 24
    }
  }, "Open with this"), /*#__PURE__*/React.createElement(AiOpener, {
    style: {
      marginTop: 10
    }
  }, card.opener), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 20,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onLog(card.name)
  }, "Log call"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onOpenAccount(card)
  }, "Open account"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Email opener"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Add reminder"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    style: {
      marginLeft: 'auto'
    },
    onClick: () => step(1)
  }, "Skip 3 days \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--grad-rail-inset)',
      padding: '28px 26px'
    }
  }, /*#__PURE__*/React.createElement(Label, {
    style: {
      letterSpacing: '.18em'
    }
  }, "Why this account, today"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 12
    }
  }, card.reasons.map(w => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      background: 'rgba(255,255,255,.8)',
      borderRadius: 'var(--radius-inset)',
      padding: '11px 14px',
      fontSize: 12.5,
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: 'var(--problem)',
      marginTop: 6,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", null, w)))), /*#__PURE__*/React.createElement(Label, {
    style: {
      letterSpacing: '.18em',
      marginTop: 22
    }
  }, "Reorders overdue"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      font: '800 30px var(--font-core)',
      letterSpacing: 'var(--track-value)',
      color: card.reorder === '$0' ? 'var(--ink-300)' : 'var(--problem-text)'
    }
  }, card.reorder), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--ink-500)',
      marginTop: 5,
      lineHeight: 1.45
    }
  }, card.reorderNote), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    trailing: "\u2192",
    style: {
      marginTop: 18
    }
  }, "Build the quote"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, rest.map((f, n) => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    style: {
      borderRadius: 'var(--radius-card-sm)',
      background: 'rgba(255,255,255,.78)',
      padding: '15px 20px',
      display: 'grid',
      gridTemplateColumns: '38px 1fr 230px auto',
      gap: 18,
      alignItems: 'center',
      opacity: 1 - n * 0.08
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 24px/1 var(--font-core)',
      color: 'rgba(27,31,36,.16)',
      letterSpacing: 'var(--track-value)'
    }
  }, n + 2), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-row-title)',
      letterSpacing: 'var(--track-row-title)'
    }
  }, f.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ink-300)',
      marginTop: 4
    }
  }, f.meta)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    style: {
      fontSize: 9,
      letterSpacing: '.15em'
    }
  }, f.whyLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      color: 'var(--problem-text)',
      marginTop: 4,
      lineHeight: 1.3
    }
  }, f.signal)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => onOpenAccount(f)
  }, "Open"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => onLog(f.name)
  }, "Log"))))), /*#__PURE__*/React.createElement(Card, {
    tone: "veil",
    radius: "panelSm",
    pad: "22px 24px 16px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 19,
      letterSpacing: '-.02em'
    }
  }, "The rest of the book"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    style: {
      marginLeft: 'auto',
      color: 'var(--slate)'
    }
  }, "See all 183 \u2192")), window.ACCOUNTS.slice(0, 6).map((r, n) => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 110px 110px 120px 130px 96px',
      gap: 14,
      alignItems: 'center',
      padding: '12px 14px',
      borderRadius: 'var(--radius-inset)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 13.5
    }
  }, r.name), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: '#a3acb8'
    }
  }, r.id), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ink-300)',
      marginTop: 3
    }
  }, r.sector)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ProgressBar, {
    value: r.score,
    fill: r.score < 35 ? 'var(--problem-text)' : ['var(--value-1)', 'var(--value-2)', 'var(--value-3)', 'var(--value-4)'][n % 4]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--ink-300)',
      marginTop: 5,
      letterSpacing: '.08em'
    }
  }, "SCORE ", r.score)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: r.tickets > 3 ? 'var(--problem-text)' : 'var(--ink-600)'
    }
  }, r.tickets, " tickets"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--ink-500)'
    }
  }, r.lastOrder), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: 'var(--problem-text)'
    }
  }, r.overdue), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      font: '800 14px var(--font-core)'
    }
  }, r.value))))), /*#__PURE__*/React.createElement(DarkPanel, {
    sticky: true,
    kicker: "Second Brain",
    title: "Your morning brief"
  }, /*#__PURE__*/React.createElement(DarkPanelRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.65,
      color: 'var(--text-on-dark-body)'
    }
  }, "Five accounts are worth your morning. Farm Boy alone accounts for $545K of the $616K you're at risk of losing this year \u2014 and nobody has called them since April."), /*#__PURE__*/React.createElement(DarkPanelLabel, {
    style: {
      marginTop: 22
    }
  }, "Ask before you hang up"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 12
    }
  }, window.ASKS.map(q => /*#__PURE__*/React.createElement(RailItem, {
    key: q,
    arrow: true
  }, q))), /*#__PURE__*/React.createElement(DarkPanelRule, {
    style: {
      margin: '24px 0 18px'
    }
  }), /*#__PURE__*/React.createElement(DarkPanelLabel, null, "Upsell the brain spotted"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 12
    }
  }, window.UPSELL.map(u => /*#__PURE__*/React.createElement(RailItem, {
    key: u.name,
    slide: false,
    style: {
      flexDirection: 'column',
      borderRadius: 'var(--radius-card)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800
    }
  }, u.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-on-dark-meta)',
      marginTop: 4,
      lineHeight: 1.4
    }
  }, u.why), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 16px var(--font-core)',
      color: 'var(--sky-bright)',
      marginTop: 7
    }
  }, u.value)))), /*#__PURE__*/React.createElement(Button, {
    block: true,
    trailing: "\u2192",
    style: {
      marginTop: 22,
      background: 'var(--grad-primary-soft)'
    },
    onClick: () => onOpenAccount(window.QUEUE[0])
  }, "Brief me on any account")));
}
Object.assign(window, {
  DailyBrief
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-desktop/DailyBrief.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-desktop/Overlays.jsx
try { (() => {
const NS6 = window.SecondBrainDesignSystem_3cef5c;
const TICKETS = [{
  title: 'Trainyards lane 3 offline',
  id: 'TCK-40118',
  site: 'Ottawa · Trainyards',
  status: 'Escalated',
  color: 'var(--problem-text)'
}, {
  title: 'Scale calibration drift',
  id: 'TCK-39880',
  site: 'Alderwood',
  status: 'Open 41d',
  color: 'var(--problem-text)'
}, {
  title: 'Rideau printer replacement',
  id: 'TCK-39544',
  site: 'Rideau',
  status: 'Waiting on parts',
  color: 'var(--stale-text)'
}, {
  title: 'Pinpad firmware rollback',
  id: 'TCK-39501',
  site: 'Kanata',
  status: 'Open 22d',
  color: 'var(--stale-text)'
}, {
  title: 'Self-checkout receipt jam',
  id: 'TCK-39320',
  site: 'Barrhaven',
  status: 'Open 12d',
  color: 'var(--ink-600)'
}, {
  title: 'Scanner swap, lane 6',
  id: 'TCK-39188',
  site: 'Orleans',
  status: 'Scheduled',
  color: 'var(--dormant-text)'
}];
const TALKING = ['Alderwood and Rideau both stopped ordering the same week — ask whether a single decision drove it.', 'The March renewal is the lever: 63 sites on Cloud Store Dynamics 2.', '$18,400 of reorders are past cadence; a single quote clears most of it.'];
const WATCH = ['Dave escalated the Trainyards lane twice in July. Lead with it, do not lead with pricing.', 'Procurement froze discretionary spend until the fiscal year turns in October.'];
function AccountModal({
  account,
  onClose,
  onLog
}) {
  const {
    Modal,
    ModalBody,
    StatCard,
    Label,
    Inset,
    Button,
    Chip
  } = NS6;
  if (!account) return null;
  return /*#__PURE__*/React.createElement(Modal, {
    open: true,
    onClose: onClose,
    kicker: "Account \xB7 Grocery \xB7 Ottawa, Ontario",
    title: account.name,
    headerExtra: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 20,
        flexWrap: 'wrap'
      }
    }, [['Revenue at risk', '$544,656', 'var(--problem-text)'], ['Total revenue', '$731,514', 'var(--value-1)'], ['Health', '58', 'var(--value-3)'], ['Open tickets', '6', 'var(--problem-text)'], ['Last order', '116d ago', 'var(--value-2)'], ['Sites', '63', 'var(--value-4)']].map(a => /*#__PURE__*/React.createElement(StatCard, {
      key: a[0],
      size: "sm",
      tone: "glass",
      hover: false,
      label: a[0],
      value: a[1],
      color: a[2],
      style: {
        flex: 1,
        minWidth: 130,
        borderRadius: 'var(--radius-inset)',
        background: 'rgba(255,255,255,.9)',
        border: 'none'
      }
    })))
  }, /*#__PURE__*/React.createElement(ModalBody, {
    columns: "1.3fr 1fr"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    style: {
      letterSpacing: '.18em'
    }
  }, "Open tickets"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      marginTop: 12
    }
  }, TICKETS.map(t => /*#__PURE__*/React.createElement(Inset, {
    key: t.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 150px 130px',
      gap: 14,
      alignItems: 'center',
      padding: '13px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800
    }
  }, t.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--ink-300)',
      marginTop: 4
    }
  }, t.id)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--ink-500)'
    }
  }, t.site), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 11.5,
      fontWeight: 800,
      color: t.color
    }
  }, t.status)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      onLog(account.name);
      onClose();
    }
  }, "Log call"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Build the quote"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Add reminder"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    style: {
      letterSpacing: '.18em'
    }
  }, "Talking points"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      marginTop: 12
    }
  }, TALKING.map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      borderRadius: 'var(--radius-inset)',
      background: 'var(--surface-hover-2)',
      padding: '13px 16px',
      fontSize: 12.5,
      lineHeight: 1.55
    }
  }, p))), /*#__PURE__*/React.createElement(Label, {
    style: {
      letterSpacing: '.18em',
      marginTop: 20
    }
  }, "Watch out"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      marginTop: 12
    }
  }, WATCH.map(w => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      borderRadius: 'var(--radius-inset)',
      background: 'var(--problem-tint)',
      padding: '13px 16px',
      fontSize: 12.5,
      lineHeight: 1.55,
      color: 'var(--problem-deep)'
    }
  }, w))))));
}
function ItemModal({
  item,
  status,
  onClose
}) {
  const {
    Modal,
    Label,
    Inset,
    Button,
    Chip
  } = NS6;
  if (!item) return null;
  const fields = [['Item type', item.type, 'var(--ink)'], ['Category', 'Hardware', 'var(--ink)'], ['Customers', item.customers, 'var(--value-1)'], ['Units sold', item.units, 'var(--value-2)'], ['Last ordered', item.last, status.lastColor], ['Retail', item.retail, 'var(--ink)'], ['Average sell', item.price, 'var(--value-1)'], ['Fleet total', item.total.replace(' total', ''), 'var(--value-3)'], ['Related items', '12', 'var(--value-4)']];
  return /*#__PURE__*/React.createElement(Modal, {
    open: true,
    width: 920,
    onClose: onClose,
    kicker: "Master catalog item \xB7 fleet-wide",
    title: item.name,
    headerExtra: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        marginTop: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Chip, {
      tone: "neutral"
    }, item.type), /*#__PURE__*/React.createElement(Chip, {
      tone: item.discontinued ? 'stale' : 'healthy',
      dot: item.discontinued ? 'var(--stale)' : 'var(--healthy)'
    }, status.flag), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: 'var(--ink-600)'
      }
    }, item.customers, " customers have bought it \xB7 last order ", item.last))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 32px 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-inset)',
      background: 'var(--surface-hover-2)',
      padding: '13px 17px',
      fontSize: 12.5,
      color: 'var(--slate-deep)',
      lineHeight: 1.5
    }
  }, "Numbers here are fleet-wide, not just your book. ", item.customers, " customers across all reps have ordered this part."), /*#__PURE__*/React.createElement(Inset, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 20,
      padding: '16px 20px',
      borderRadius: 'var(--radius-card-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Part number"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 17,
      fontWeight: 700,
      marginTop: 6
    }
  }, item.part)), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    style: {
      marginLeft: 'auto'
    }
  }, "Copy")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 10,
      marginTop: 12
    }
  }, fields.map(f => /*#__PURE__*/React.createElement(Inset, {
    key: f[0],
    style: {
      padding: '14px 17px'
    }
  }, /*#__PURE__*/React.createElement(Label, null, f[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      marginTop: 7,
      letterSpacing: '-.01em',
      color: f[2]
    }
  }, f[1])))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Last 10 orders"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Top 10 related items"))));
}
Object.assign(window, {
  AccountModal,
  ItemModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-desktop/Overlays.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-desktop/Reports.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const NS4 = window.SecondBrainDesignSystem_3cef5c;
function Reports() {
  const {
    SectionHead,
    SegmentedControl,
    StatCard,
    Card,
    Label,
    Inset,
    ProgressBar
  } = NS4;
  const [tab, setTab] = React.useState('Revenue');
  const [period, setPeriod] = React.useState('YTD');
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 28
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Sales performance \xB7 your accounts",
    title: "Reports",
    action: /*#__PURE__*/React.createElement(SegmentedControl, {
      tone: "solid",
      size: "sm",
      options: ['MTD', 'QTD', 'YTD', '2025'],
      value: period,
      onChange: setPeriod
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 9,
      marginTop: 18
    }
  }, window.KPIS.map(k => /*#__PURE__*/React.createElement(StatCard, _extends({
    key: k.label
  }, k)))), /*#__PURE__*/React.createElement(SegmentedControl, {
    style: {
      margin: '26px 0 14px'
    },
    options: ['Revenue', 'Customers', 'Pipeline', 'Contracts'],
    value: tab,
    onChange: setTab
  }), tab === 'Revenue' ? /*#__PURE__*/React.createElement(Card, {
    radius: "panelSm",
    pad: "26px 28px"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    level: "section",
    title: "Monthly revenue trend",
    caption: "2026 vs 2025 \xB7 pre-tax subtotal"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      fontSize: 11,
      margin: '14px 0 10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 4,
      borderRadius: 999,
      background: 'var(--slate)'
    }
  }), "2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 4,
      borderRadius: 999,
      background: 'var(--blue-mute)'
    }
  }), "2025")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 900 260",
    style: {
      width: '100%',
      height: 290,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "rpArea",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#33648b",
    stopOpacity: ".26"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#33648b",
    stopOpacity: "0"
  }))), [20, 80, 140, 200].map(y => /*#__PURE__*/React.createElement("line", {
    key: y,
    x1: "60",
    y1: y,
    x2: "880",
    y2: y,
    stroke: "rgba(27,31,36,.08)",
    strokeWidth: "1"
  })), [['$452K', 24], ['$339K', 84], ['$226K', 144], ['$113K', 204]].map(t => /*#__PURE__*/React.createElement("text", {
    key: t[0],
    x: "0",
    y: t[1],
    fontSize: "11",
    fill: "#8b95a1",
    fontFamily: "Archivo"
  }, t[0])), /*#__PURE__*/React.createElement("path", {
    d: "M90 214 C125 210 130 209 160 208 C195 206 205 197 230 196 C265 194 275 211 300 212 C335 213 345 191 370 190 C405 188 415 169 440 168 C475 166 485 182 510 182 C545 182 555 122 580 120 C615 117 625 146 650 146 C685 146 695 97 720 96 C755 94 765 59 790 58 C825 56 835 45 860 44 L860 230 L90 230 Z",
    fill: "url(#rpArea)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M90 205 C125 201 130 197 160 196 C195 194 205 189 230 188 C265 186 275 199 300 200 C335 201 345 179 370 178 C405 176 415 186 440 186 C475 186 485 151 510 150 C545 148 555 167 580 168 C615 168 625 141 650 140 C685 139 695 152 720 152 C755 152 765 121 790 120 C825 118 835 133 860 132",
    fill: "none",
    stroke: "#c3ccd7",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeDasharray: "6 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M90 214 C125 210 130 209 160 208 C195 206 205 197 230 196 C265 194 275 211 300 212 C335 213 345 191 370 190 C405 188 415 169 440 168 C475 166 485 182 510 182 C545 182 555 122 580 120 C615 117 625 146 650 146 C685 146 695 97 720 96 C755 94 765 59 790 58 C825 56 835 45 860 44",
    fill: "none",
    stroke: "#33648b",
    strokeWidth: "3.5",
    strokeLinecap: "round"
  }), [[90, 214], [160, 208], [230, 196], [300, 212], [370, 190], [440, 168], [510, 182], [580, 120], [650, 146], [720, 96], [790, 58], [860, 44]].map(d => /*#__PURE__*/React.createElement("circle", {
    key: d[0],
    cx: d[0],
    cy: d[1],
    r: "4.5",
    fill: "#fff",
    stroke: "#33648b",
    strokeWidth: "2.5"
  })), MONTHS.map((m, n) => /*#__PURE__*/React.createElement("text", {
    key: m,
    x: 90 + n * 70,
    y: "252",
    fontSize: "11",
    fill: "#8b95a1",
    fontFamily: "Archivo",
    textAnchor: "middle"
  }, m))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 32,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    style: {
      marginBottom: 12
    }
  }, "Revenue mix by sector"), window.MIX.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '130px 1fr 90px',
      gap: 12,
      alignItems: 'center',
      padding: '9px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800
    }
  }, m.name), /*#__PURE__*/React.createElement(ProgressBar, {
    value: m.w,
    height: 9,
    fill: m.bar,
    track: "rgba(27,31,36,.08)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 12.5,
      fontWeight: 800
    }
  }, m.value)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    style: {
      marginBottom: 12
    }
  }, "Three revenue buckets"), window.BUCKETS.map(b => /*#__PURE__*/React.createElement(Inset, {
    key: b.name,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800,
      flex: 1
    }
  }, b.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ink-300)'
    }
  }, b.note), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 18px var(--font-core)',
      color: b.color,
      letterSpacing: '-.02em'
    }
  }, b.value)))))) : null, tab === 'Customers' ? /*#__PURE__*/React.createElement(Card, {
    radius: "panelSm",
    pad: "26px 28px"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    level: "section",
    title: "Rep performance scorecard"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, [['Horatio Ozsvath', '183', '42', '78%', '$324,575', '218', '$1,489', '96%'], ['Rob Whitfield', '171', '31', '62%', '$281,430', '194', '$1,451', '88%'], ['Dana Osei', '166', '28', '54%', '$243,900', '176', '$1,386', '91%'], ['Marc Leblanc', '198', '51', '88%', '$402,110', '244', '$1,648', '74%'], ['Priya Raman', '142', '19', '41%', '$198,640', '151', '$1,315', '97%']].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s[0],
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 90px 90px 1fr 90px 90px 90px',
      gap: 12,
      alignItems: 'center',
      padding: '13px 14px',
      borderRadius: 'var(--radius-inset)',
      fontSize: 12.5,
      background: i % 2 ? 'var(--surface-inset)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800
    }
  }, s[0]), /*#__PURE__*/React.createElement("div", null, s[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--problem-text)',
      fontWeight: 800
    }
  }, s[2]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: s[3],
    height: 8,
    fill: "var(--grad-bar-sky)",
    track: "rgba(27,31,36,.08)",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800
    }
  }, s[4])), /*#__PURE__*/React.createElement("div", null, s[5]), /*#__PURE__*/React.createElement("div", null, s[6]), /*#__PURE__*/React.createElement("div", null, s[7]))))) : null, tab === 'Pipeline' ? /*#__PURE__*/React.createElement(Card, {
    radius: "panelSm",
    pad: "26px 28px"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    level: "section",
    title: "Pipeline vs closed",
    caption: "Win rate 23%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 46,
      marginTop: 18,
      borderRadius: 999,
      overflow: 'hidden',
      background: 'var(--ground-base)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '23%',
      background: 'var(--grad-primary)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 20,
      font: '800 13px var(--font-core)'
    }
  }, "23%"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '77%',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 20,
      font: '800 13px var(--font-core)',
      color: 'var(--ink-300)'
    }
  }, "77%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    tone: "inset",
    hover: false,
    label: "Closed",
    value: "$199,431",
    note: "Approved $154K \xB7 awaiting payment $45K"
  }), /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    tone: "inset",
    hover: false,
    label: "Pipeline",
    value: "$667,700",
    note: "In progress $239K \xB7 pending customer $428K",
    color: "var(--slate)"
  })), /*#__PURE__*/React.createElement(Label, {
    style: {
      margin: '24px 0 10px'
    }
  }, "Open quotes"), [['#126108', 'White Spot Limited', 'Sent — awaiting customer', '31d', '$84,200'], ['#126044', 'Farm Boy Company Inc', 'In progress', '12d', '$212,400'], ['#125988', 'Pattison Food Group Ltd', 'Pending pricing approval', '19d', '$146,900'], ['#125902', 'Kootenay Co-op', 'Draft', '44d', '$18,400'], ['#125871', 'The Root Cellar', 'Sent — awaiting customer', '58d', '$6,100']].map(q => /*#__PURE__*/React.createElement("div", {
    key: q[0],
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr 200px 90px 120px',
      gap: 14,
      alignItems: 'center',
      padding: '13px 14px',
      borderRadius: 'var(--radius-inset)',
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--ink-300)'
    }
  }, q[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800
    }
  }, q[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-500)'
    }
  }, q[2]), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-300)'
    }
  }, q[3]), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      font: '800 15px var(--font-core)'
    }
  }, q[4])))) : null, tab === 'Contracts' ? /*#__PURE__*/React.createElement(Card, {
    radius: "panelSm",
    pad: "26px 28px"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    level: "section",
    title: "Renewal pipeline",
    caption: "128 of 183 accounts under contract"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 10,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    tone: "inset",
    hover: false,
    label: "Next 30 days",
    value: "6",
    note: "$84,200 at stake",
    color: "var(--problem-text)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    tone: "inset",
    hover: false,
    label: "31\u201360 days",
    value: "11",
    note: "$142,700",
    color: "var(--value-1)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    tone: "inset",
    hover: false,
    label: "61\u201390 days",
    value: "9",
    note: "$96,400",
    color: "var(--value-3)"
  }), /*#__PURE__*/React.createElement(StatCard, {
    size: "lg",
    tone: "inset",
    hover: false,
    label: "Warranty only",
    value: "23",
    note: "no paid coverage",
    color: "var(--value-4)"
  })), /*#__PURE__*/React.createElement(Label, {
    style: {
      margin: '24px 0 10px'
    }
  }, "Contracts ending next 90 days"), [['Farm Boy Company Inc', 'Cloud Store Dynamics 2', 'Annual · auto-renew', '30 Mar 2027', '$212,400'], ['Mitsubishi HC Capital Canada', 'Leasing schedule', 'Multi-year', '12 Mar 2027', '$96,220'], ['White Spot Limited', 'LOC SMS rental', 'Monthly', '01 Nov 2026', '$13,680'], ['Pattison Food Group Ltd', 'Store Dynamics', 'Annual', '18 Oct 2026', '$114,620'], ['Lucky Supermarket Surrey', 'Warranty only', '—', '04 Oct 2026', '$0']].map(c => /*#__PURE__*/React.createElement("div", {
    key: c[0],
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 190px 160px 130px 120px',
      gap: 14,
      alignItems: 'center',
      padding: '13px 14px',
      borderRadius: 'var(--radius-inset)',
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800
    }
  }, c[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-500)'
    }
  }, c[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-500)'
    }
  }, c[2]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      color: 'var(--problem-text)'
    }
  }, c[3]), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      font: '800 15px var(--font-core)'
    }
  }, c[4])))) : null);
}
Object.assign(window, {
  Reports
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-desktop/Reports.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-desktop/Shell.jsx
try { (() => {
const {
  Sidebar,
  SidebarBrand,
  SidebarUser,
  NavItem,
  SearchBar,
  Ticker,
  Icon,
  IconButton,
  Button
} = window.SecondBrainDesignSystem_3cef5c;
const NAV = [{
  k: 'brief',
  label: 'Daily Brief',
  icon: 'brief',
  badge: '5'
}, {
  k: 'accounts',
  label: 'My Accounts',
  icon: 'accounts',
  badge: '183'
}, {
  k: 'reminders',
  label: 'Reminders',
  icon: 'reminders',
  badge: '83',
  urgent: true
}, {
  k: 'catalog',
  label: 'Master Catalog',
  icon: 'catalog',
  badge: ''
}, {
  k: 'reports',
  label: 'Reports',
  icon: 'reports',
  badge: ''
}, {
  k: 'commissions',
  label: 'Commissions',
  icon: 'commissions',
  badge: ''
}, {
  k: 'manager',
  label: 'Manager View',
  icon: 'manager',
  badge: ''
}, {
  k: 'pe',
  label: 'PE Reference',
  icon: 'document',
  badge: ''
}, {
  k: 'roadmap',
  label: 'Our Roadmap',
  icon: 'roadmap',
  badge: ''
}, {
  k: 'settings',
  label: 'Settings',
  icon: 'settings',
  badge: ''
}];
function Shell({
  screen,
  onNavigate,
  onBrief,
  children
}) {
  const [min, setMin] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: (min ? '64px' : '224px') + ' 1fr',
      padding: 14,
      boxSizing: 'border-box',
      transition: 'grid-template-columns .45s cubic-bezier(.22,1,.36,1)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    collapsed: min,
    header: /*#__PURE__*/React.createElement(SidebarBrand, {
      collapsed: min,
      action: /*#__PURE__*/React.createElement(IconButton, {
        tone: "dark",
        size: 28,
        title: "Collapse",
        onClick: () => setMin(true)
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "chevronLeft",
        size: 13,
        weight: 2
      }))
    }),
    footer: /*#__PURE__*/React.createElement(SidebarUser, {
      collapsed: min,
      initials: "HO",
      name: "Horatio Ozsvath",
      role: "Rep \xB7 Admin"
    })
  }, min ? /*#__PURE__*/React.createElement(IconButton, {
    tone: "dark",
    size: 28,
    title: "Expand",
    onClick: () => setMin(false),
    style: {
      margin: '2px auto 6px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 13,
    weight: 2
  })) : null, NAV.map(n => /*#__PURE__*/React.createElement(NavItem, {
    key: n.k,
    collapsed: min,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: n.icon
    }),
    label: n.label,
    badge: n.badge,
    badgeUrgent: n.urgent,
    active: screen === n.k,
    onClick: () => onNavigate(n.k)
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      minWidth: 0,
      paddingLeft: 14
    }
  }, /*#__PURE__*/React.createElement(SearchBar, {
    style: {
      marginBottom: 12
    },
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15,
      weight: 2
    }),
    placeholder: 'Ask the brain — “who should I call about Store Dynamics renewals?”',
    action: /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      onClick: onBrief
    }, "Brief me")
  }), /*#__PURE__*/React.createElement(Ticker, {
    items: window.TICKER,
    style: {
      marginBottom: 16
    }
  }), children));
}
Object.assign(window, {
  Shell,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-desktop/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-desktop/data.jsx
try { (() => {
/* Content lifted from the source build's logic class so the recreation reads
   like the real tool. Rep: Horatio Ozsvath, 183 accounts, Wednesday 6 August. */

const ACCOUNTS = [{
  id: 'B87086',
  name: 'KOOTENAY CO-OP',
  sector: 'Grocery',
  score: 5,
  tickets: 2,
  lastOrder: '420d ago',
  value: '$6,295',
  overdue: '391d overdue'
}, {
  id: 'B72000',
  name: 'PATTISON FOOD GROUP LTD',
  sector: 'Grocery',
  score: 5,
  tickets: 40,
  lastOrder: '366d ago',
  value: '$1,040',
  overdue: '337d overdue'
}, {
  id: 'B88070',
  name: 'THE ROOT CELLAR',
  sector: 'Grocery',
  score: 5,
  tickets: 4,
  lastOrder: '426d ago',
  value: '$3,135',
  overdue: '397d overdue'
}, {
  id: 'B10050',
  name: 'A&S ENTERPRISE MANAGEMENT INC',
  sector: 'Grocery',
  score: 10,
  tickets: 1,
  lastOrder: '1108d ago',
  value: '$280',
  overdue: '1079d overdue'
}, {
  id: '1000338',
  name: "DENNY'S WINDERMERE BLVD #9819",
  sector: 'Table Service',
  score: 10,
  tickets: 1,
  lastOrder: '1018d ago',
  value: '$30,119.95',
  overdue: '989d overdue'
}, {
  id: 'KB55503',
  name: 'LUCKY SUPERMARKET FOREST LAWN',
  sector: 'Grocery',
  score: 10,
  tickets: 1,
  lastOrder: '848d ago',
  value: '$2,639',
  overdue: '819d overdue'
}, {
  id: '010367',
  name: 'LUCKY SUPERMARKET SURREY',
  sector: 'Grocery',
  score: 10,
  tickets: 1,
  lastOrder: '848d ago',
  value: '$3,770',
  overdue: '819d overdue'
}, {
  id: 'B73270',
  name: 'PAZ FUELS LTD',
  sector: 'Other',
  score: 10,
  tickets: 5,
  lastOrder: '512d ago',
  value: '$4,784.50',
  overdue: '483d overdue'
}, {
  id: 'B20938',
  name: 'THE MARKET ON YATES',
  sector: 'Grocery',
  score: 10,
  tickets: 1,
  lastOrder: '436d ago',
  value: '$1,280',
  overdue: '407d overdue'
}, {
  id: 'B34181',
  name: 'FARM BOY COMPANY INC',
  sector: 'Grocery',
  score: 58,
  tickets: 6,
  lastOrder: '116d ago',
  value: '$6,145',
  overdue: '87d overdue'
}, {
  id: '1000125',
  name: 'FAIRWAY MARKET — SHELBOURNE PLAZA',
  sector: 'Grocery',
  score: 10,
  tickets: 1,
  lastOrder: '—',
  value: '—',
  overdue: 'never'
}, {
  id: 'B52450',
  name: 'KITSUMKALUM TEMPO GAS BAR',
  sector: 'Retail',
  score: 12,
  tickets: 0,
  lastOrder: '392d ago',
  value: '$15,075',
  overdue: '363d overdue'
}];
const QUEUE = [{
  name: 'Farm Boy Company Inc',
  id: 'B34181',
  meta: 'Grocery · Last order $1,640',
  sub: 'Grocery · Ottawa, Ontario · 63 sites · Cloud Store Dynamics 2, LOC SMS',
  signal: 'Revenue dropped 98% YoY ($544,656)',
  whyLabel: 'Why now',
  opener: '“Hi Dave — I noticed the Alderwood and Rideau stores have gone quiet since April while you’ve had six tickets open on the Trainyards lanes. Is the rollout stalled, or has something changed on your side?”',
  stats: [{
    label: 'Total revenue',
    value: '$731,514'
  }, {
    label: 'YTD',
    value: '$6,145'
  }, {
    label: 'Open tickets',
    value: '6'
  }, {
    label: 'Health',
    value: '58'
  }],
  reasons: ['Revenue down 98% year over year — $544,656 gone', 'No contact logged since 12 April', 'Six open tickets, oldest 41 days', 'Contract ends 30 March 2027 — renewal window opens in 60 days'],
  reorder: '$18,400',
  reorderNote: '7 parts past their usual cadence — cash drawers and thermal receipt rolls'
}, {
  name: 'Paz Fuels Ltd',
  id: 'B73270',
  meta: 'Other · Last order $4,785',
  sub: 'Fuel retail · 5 sites · LOC SMS',
  signal: 'Revenue dropped 100% YoY ($22,480)',
  whyLabel: 'Why now',
  opener: '“Morning — we spoke about seven weeks ago and I never closed the loop on the five open tickets. Before I chase pricing, can I get those cleared for you?”',
  stats: [{
    label: 'Total revenue',
    value: '$96,220'
  }, {
    label: 'YTD',
    value: '$0'
  }, {
    label: 'Open tickets',
    value: '5'
  }, {
    label: 'Health',
    value: '10'
  }],
  reasons: ['No order in 512 days', 'Five open tickets, none touched in 90 days', 'Last contact 51 days ago went nowhere', 'Nearest competitor has three sites on the same street'],
  reorder: '$3,100',
  reorderNote: '2 parts past cadence — receipt rolls and a pinpad cable'
}, {
  name: 'Mitsubishi HC Capital Canada Leasing Inc',
  id: '1000474',
  meta: 'Grocery · Last order $17,055',
  sub: 'Leasing · national · Store Dynamics',
  signal: 'Churning — high attrition risk',
  whyLabel: 'Why now',
  opener: '“Your lease schedule ends in March and I want to get ahead of it. Can we book 20 minutes to walk through what renews and what you’d rather retire?”',
  stats: [{
    label: 'Total revenue',
    value: '$212,400'
  }, {
    label: 'YTD',
    value: '$17,055'
  }, {
    label: 'Open tickets',
    value: '0'
  }, {
    label: 'Health',
    value: '31'
  }],
  reasons: ['Churn model flags high attrition risk', 'Leasing contract ends March 2027', 'No renewal conversation on record', 'Order cadence halved over two quarters'],
  reorder: '$0',
  reorderNote: 'Nothing overdue — this is a renewal conversation, not a parts one'
}, {
  name: 'The Root Cellar',
  id: 'B88070',
  meta: 'Grocery · Last order $3,135',
  sub: 'Independent grocery · 2 sites · LOC SMS',
  signal: 'Revenue dropped 100% YoY ($19,305)',
  whyLabel: 'Why now',
  opener: '“Hi — four tickets are still open on your side and I owe you a follow-up from two months back. What’s the state of the front lanes right now?”',
  stats: [{
    label: 'Total revenue',
    value: '$61,900'
  }, {
    label: 'YTD',
    value: '$0'
  }, {
    label: 'Open tickets',
    value: '4'
  }, {
    label: 'Health',
    value: '5'
  }],
  reasons: ['No order in 426 days', 'Four open tickets', '397 days overdue on the promised follow-up', 'Small book — a single quote fixes the year'],
  reorder: '$1,850',
  reorderNote: '3 parts past cadence — thermal rolls'
}, {
  name: 'Kitsumkalum Tempo Gas Bar',
  id: 'B52450',
  meta: 'Retail · Last order $15,075',
  sub: 'Fuel retail · 1 site · LOC SMS',
  signal: 'Revenue dropped 100% YoY ($15,075)',
  whyLabel: 'Why now',
  opener: '“Quick one — you bought a full lane refit last year and we haven’t heard from you since. Is everything running the way you expected?”',
  stats: [{
    label: 'Total revenue',
    value: '$15,075'
  }, {
    label: 'YTD',
    value: '$0'
  }, {
    label: 'Open tickets',
    value: '0'
  }, {
    label: 'Health',
    value: '12'
  }],
  reasons: ['One large order then complete silence', 'No contact ever logged', 'Site status unconfirmed since the refit', 'Warranty expires in four months'],
  reorder: '$640',
  reorderNote: '1 part past cadence — receipt rolls'
}];
const TICKER = [{
  when: '9:30',
  text: 'Kootenay Co-op — deli scale quote promised 391 days ago',
  dot: 'var(--on-dark-coral)'
}, {
  when: '10:15',
  text: 'Farm Boy — six tickets open on the Trainyards lanes',
  dot: 'var(--on-dark-coral)'
}, {
  when: '11:00',
  text: 'White Spot #126108 — coverage proposal 31 days silent',
  dot: 'var(--on-dark-blue)'
}, {
  when: '1:30',
  text: 'Mitsubishi HC Capital — renewal window opens in 60 days',
  dot: 'var(--on-dark-blue)'
}, {
  when: '2:45',
  text: 'The Market on Yates — second lane never confirmed live',
  dot: 'var(--on-dark-blue)'
}, {
  when: '4:00',
  text: 'Sobeys reorder cleared — queue down to four',
  dot: 'var(--on-dark-green)'
}];
const CATALOG = [{
  name: 'HP, BTO, EPSON TM88VI PUSB PRINTER ONLY',
  type: 'Printer',
  discontinued: false,
  part: '6BC94AA',
  customers: '3',
  units: '975 units',
  last: 'Sep 2025',
  retail: '—',
  price: '$555.96',
  total: '$342,297.32 total'
}, {
  name: 'T88VI,THML RCPT,SERIAL/ENET/USB,BLACK',
  type: 'Printer',
  discontinued: true,
  part: 'C31CE94061',
  customers: '138',
  units: '759 units',
  last: 'Jun 2025',
  retail: '$545.00',
  price: '$575.00',
  total: '$331,097.68 total'
}, {
  name: 'H6000V,MICR,VALID,SER/USB/ENET,BLK,NO PS',
  type: 'Printer',
  discontinued: true,
  part: 'C31CG62054',
  customers: '4',
  units: '350 units',
  last: 'Jan 2025',
  retail: '$1,179.00',
  price: '$1,150.00',
  total: '$282,701 total'
}, {
  name: 'T20III,THML RCPT,SERIAL/USB,BLK,W/PS',
  type: 'Printer',
  discontinued: true,
  part: 'C31CH51001',
  customers: '337',
  units: '768 units',
  last: 'Jun 2026',
  retail: '$286.00',
  price: '$450.00',
  total: '$204,690.54 total'
}, {
  name: 'T88VII,THML RCPT,ETHERNET/USB,BLACK',
  type: 'Printer',
  discontinued: false,
  part: 'C31CJ57052',
  customers: '108',
  units: '398 units',
  last: 'Jun 2026',
  retail: '$599.60',
  price: '$585.00',
  total: '$186,706.26 total'
}, {
  name: 'T88VII,THML RCPT,SERIAL/ETHNET/USB,BLACK',
  type: 'Printer',
  discontinued: false,
  part: 'C31CJ57012',
  customers: '83',
  units: '340 units',
  last: 'Jun 2026',
  retail: '$605.90',
  price: '$675.00',
  total: '$174,730.46 total'
}, {
  name: 'U220B,SERIAL,EDG,AUTO CUTTER,W/PS',
  type: 'Printer',
  discontinued: true,
  part: 'C31C514653',
  customers: '91',
  units: '188 units',
  last: 'Jun 2026',
  retail: '$490.00',
  price: '$545.00',
  total: '$74,723.12 total'
}, {
  name: 'TM-M30III,THML RCPT,BT/ETH/USB,BLACK',
  type: 'Printer',
  discontinued: false,
  part: 'C31CK50021',
  customers: '46',
  units: '142 units',
  last: 'Feb 2026',
  retail: '$389.00',
  price: '$425.00',
  total: '$60,350 total'
}];
const MONTHS_AGO = {
  'Jun 2026': 2,
  'Apr 2026': 4,
  'Feb 2026': 6,
  'Sep 2025': 11,
  'Jun 2025': 14,
  'Jan 2025': 19,
  'Nov 2024': 21
};

/* Status of a catalog row: discontinued wins, then recency of last order. */
function catalogStatus(c) {
  if (c.discontinued) return {
    edge: 'var(--stale)',
    flag: 'Discontinued',
    flagColor: 'var(--stale-text)',
    lastColor: 'var(--stale-text)'
  };
  if ((MONTHS_AGO[c.last] || 99) <= 18) return {
    edge: 'var(--healthy)',
    flag: 'Active',
    flagColor: 'var(--healthy-text)',
    lastColor: 'var(--healthy-text)'
  };
  return {
    edge: 'var(--dormant)',
    flag: 'Dormant',
    flagColor: 'var(--dormant-text)',
    lastColor: 'var(--dormant-text)'
  };
}
const KPIS = [{
  label: 'Revenue YTD',
  value: '$324,575',
  note: 'pre-tax subtotal',
  color: 'var(--value-1)'
}, {
  label: 'Orders',
  value: '218',
  note: 'avg $1,489',
  color: 'var(--value-2)'
}, {
  label: 'At risk',
  value: '$616,000',
  note: '5 accounts',
  color: 'var(--problem-text)'
}, {
  label: 'Pipeline',
  value: '$667,700',
  note: 'pending customer $428K',
  color: 'var(--value-3)'
}, {
  label: 'Win rate',
  value: '23%',
  note: 'closed $199,431',
  color: 'var(--value-4)'
}];
const MIX = [{
  name: 'Grocery',
  w: '62%',
  value: '$201,236',
  bar: 'linear-gradient(90deg,#8fc9ff,#22496a)'
}, {
  name: 'Table Service',
  w: '21%',
  value: '$68,161',
  bar: 'linear-gradient(90deg,#9dd0f5,#33648b)'
}, {
  name: 'Retail',
  w: '16%',
  value: '$51,932',
  bar: 'linear-gradient(90deg,#b7dcf5,#4d84b8)'
}, {
  name: 'Fuel',
  w: '14%',
  value: '$27,478',
  bar: 'linear-gradient(90deg,#b7e2f0,#2f7d8f)'
}, {
  name: 'Other',
  w: '8%',
  value: '$15,700',
  bar: 'linear-gradient(90deg,#cfe2f4,#6fa3cf)'
}];
const BUCKETS = [{
  name: 'Orders & services',
  note: 'pre-tax subtotal',
  value: '$196,275',
  color: 'var(--value-1)'
}, {
  name: 'SaaS — Store Dynamics',
  note: 'contract subtotal',
  value: '$114,620',
  color: 'var(--value-2)'
}, {
  name: 'SaaS — SMS Rental',
  note: 'full multi-year',
  value: '$13,680',
  color: 'var(--value-4)'
}];
const COMM_MONTHS = [{
  key: 'jan',
  label: 'January',
  rev: 38400,
  cost: 26900,
  status: 'Paid'
}, {
  key: 'feb',
  label: 'February',
  rev: 41200,
  cost: 28600,
  status: 'Paid'
}, {
  key: 'mar',
  label: 'March',
  rev: 52900,
  cost: 36100,
  status: 'Paid'
}, {
  key: 'apr',
  label: 'April',
  rev: 34750,
  cost: 24300,
  status: 'Paid'
}, {
  key: 'may',
  label: 'May',
  rev: 47600,
  cost: 32400,
  status: 'Paid'
}, {
  key: 'jun',
  label: 'June',
  rev: 63180,
  cost: 42900,
  status: 'Approved'
}, {
  key: 'jul',
  label: 'July',
  rev: 28900,
  cost: 20150,
  status: 'Pending'
}, {
  key: 'aug',
  label: 'August',
  rev: 17250,
  cost: 11900,
  status: 'Pending'
}];
const COMM_ACCOUNTS = ['Farm Boy Company Inc', 'Pattison Food Group Ltd', 'White Spot Limited', 'Kootenay Co-op', 'Fairway Market — Shelbourne', 'The Root Cellar'];
const COMM_PARTS = [['TM-T88VII thermal receipt printer', 'C31CJ57052'], ['Cash drawer, 5-slot', 'APG-4000'], ['Store Dynamics licence — annual', 'SD-LIC-12'], ['Install labour — lane refit', 'SVC-INST'], ['Thermal receipt rolls, case', 'ROLL-80'], ['Pinpad cable harness', 'PPC-220']];
const COMM_RATE = 0.065;
const money = n => '$' + Math.round(n).toLocaleString('en-US');
const COMM_OVERRIDES = [{
  account: 'Farm Boy Company Inc',
  note: 'strategic — house rate',
  rate: '4.0%',
  color: 'var(--slate-light)'
}, {
  account: 'Pattison Food Group Ltd',
  note: 'national agreement',
  rate: '5.0%',
  color: 'var(--slate-light)'
}, {
  account: 'Kootenay Co-op',
  note: 'win-back bonus to Dec',
  rate: '8.5%',
  color: 'var(--teal-blue)'
}, {
  account: 'White Spot Limited',
  note: 'standard',
  rate: '6.5%',
  color: 'var(--slate-deep)'
}];
const COMM_PAYOUTS = [{
  when: '15 September',
  value: '$2,743',
  note: 'June margin, approved 2 Aug',
  color: 'var(--on-dark-green)'
}, {
  when: '15 October',
  value: '$1,879',
  note: 'July margin, pending approval',
  color: 'var(--on-dark-blue)'
}, {
  when: '15 November',
  value: '$1,148',
  note: 'August partial, month open',
  color: 'var(--on-dark-blue)'
}];
const ASKS = ['Has the Alderwood rollout actually stalled, or just gone quiet?', 'Who signs off on the Trainyards ticket escalation now?', 'Is the March renewal going to procurement or straight to Dave?'];
const UPSELL = [{
  name: "Denny's Windermere Blvd",
  why: '$30K of hardware in service, no coverage contract on file',
  value: '$8,400 / yr'
}, {
  name: 'Kitsumkalum Tempo Gas Bar',
  why: 'Warranty expires in four months, refit is 11 months old',
  value: '$2,150 / yr'
}, {
  name: 'Lucky Supermarket Surrey',
  why: 'Two lanes on discontinued T88VI hardware',
  value: '$4,900 one-off'
}];
Object.assign(window, {
  ACCOUNTS,
  QUEUE,
  TICKER,
  CATALOG,
  catalogStatus,
  KPIS,
  MIX,
  BUCKETS,
  COMM_MONTHS,
  COMM_ACCOUNTS,
  COMM_PARTS,
  COMM_RATE,
  COMM_OVERRIDES,
  COMM_PAYOUTS,
  ASKS,
  UPSELL,
  money
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-desktop/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-mobile/AndroidScreens.jsx
try { (() => {
const A = window.SecondBrainDesignSystem_3cef5c;
const A_TABS = [['brief', 'Brief', 'brief'], ['accounts', 'Accounts', 'accounts'], ['reminders', 'Reminders', 'reminders'], ['catalog', 'Catalog', 'catalog'], ['more', 'More', 'settings']];
function AndroidNav({
  tab,
  onTab
}) {
  const {
    Icon
  } = A;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      height: 64,
      background: 'var(--surface)',
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      alignItems: 'center',
      borderTop: '1px solid var(--border-hair)'
    }
  }, A_TABS.map(t => {
    const on = tab === t[0];
    return /*#__PURE__*/React.createElement("button", {
      key: t[0],
      onClick: () => onTab(t[0]),
      style: {
        border: 0,
        background: 'none',
        cursor: 'pointer',
        height: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        fontFamily: 'inherit',
        color: on ? 'var(--slate-deep)' : 'var(--ink-500)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        placeItems: 'center',
        width: 56,
        height: 30,
        borderRadius: 999,
        background: on ? 'var(--ripple-android)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t[2],
      size: 19,
      weight: on ? 2 : 1.7
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9.5,
        fontWeight: 800
      }
    }, t[1]));
  }));
}
function AndroidApp() {
  const {
    Icon
  } = A;
  const [tab, setTab] = React.useState('brief');
  const q = window.QUEUE[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-core)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'radial-gradient(700px 420px at 92% -6%,#dbe7f2 0%,rgba(219,231,242,0) 62%),#eef1f5',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '0 16px',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: 'var(--grad-primary)',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      font: '800 11px/1 var(--font-core)'
    }
  }, "SB"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 17px/1 var(--font-core)',
      letterSpacing: '-.02em',
      whiteSpace: 'nowrap'
    }
  }, "Daily Brief"), /*#__PURE__*/React.createElement("button", {
    style: {
      marginLeft: 'auto',
      width: 48,
      height: 48,
      border: 0,
      background: 'none',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--ink-500)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20,
    weight: 2
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: 'auto',
      padding: '16px 16px 88px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 40,
      padding: '0 14px',
      borderRadius: 18,
      background: 'var(--surface-dark)',
      color: 'var(--text-on-dark)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--sky-bright)',
      flex: 'none',
      animation: 'fl-pulse 1.6s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-200-dark)',
      flex: 'none'
    }
  }, "Up next"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'var(--on-dark-coral)'
    }
  }, "9:30 \xB7 Kootenay Co-op quote overdue"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 10.5,
      fontWeight: 800,
      color: 'var(--sky-bright)',
      flex: 'none'
    }
  }, "+4")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      borderRadius: 20,
      background: 'var(--surface)',
      padding: 18,
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 26px/1.12 var(--font-core)',
      letterSpacing: 'var(--track-value)'
    }
  }, "Five accounts need you today"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      marginTop: 16,
      paddingBottom: 2,
      scrollbarWidth: 'none'
    }
  }, [['Revenue at risk', '$544K', 'var(--problem-text)'], ['Cleared', '3 / 8', 'var(--healthy-text)'], ['Reorders', '$24,090', 'var(--slate-light)']].map(s => /*#__PURE__*/React.createElement("div", {
    key: s[0],
    style: {
      flex: 'none',
      minWidth: 132,
      borderRadius: 16,
      background: 'var(--surface-inset)',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, s[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 22px/1 var(--font-core)',
      letterSpacing: 'var(--track-value)',
      marginTop: 7,
      color: s[2]
    }
  }, s[1]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      borderRadius: 18,
      background: 'var(--surface)',
      padding: 18,
      border: '1px solid var(--problem)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 18px/1.2 var(--font-core)',
      letterSpacing: 'var(--track-section-head)'
    }
  }, q.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--ink-300)',
      marginTop: 5
    }
  }, q.id, " \xB7 Grocery \xB7 63 sites"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 14,
      background: 'var(--surface-hover-2)',
      padding: '13px 15px',
      marginTop: 12,
      fontSize: 12.5,
      lineHeight: 1.55,
      color: 'var(--slate-deep)'
    }
  }, q.opener), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: 14,
      background: 'var(--surface-inset)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Tickets"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 15px/1 var(--font-core)',
      marginTop: 6,
      color: 'var(--problem-text)'
    }
  }, "6")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      borderRadius: 14,
      background: 'var(--surface-inset)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Health"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 15px/1 var(--font-core)',
      marginTop: 6,
      color: 'var(--slate-light)'
    }
  }, "58")))), window.ACCOUNTS.slice(0, 4).map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      flex: 'none',
      borderRadius: 16,
      background: 'var(--surface)',
      padding: '14px 16px',
      border: '1px solid ' + (a.score < 35 ? 'var(--problem)' : 'var(--dormant)')
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 13.5px/1.25 var(--font-core)'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 20px/1 var(--font-core)',
      letterSpacing: 'var(--track-value)',
      color: a.score < 35 ? 'var(--problem-text)' : 'var(--slate-light)'
    }
  }, a.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      fontSize: 10.5,
      fontWeight: 800,
      color: 'var(--problem-text)'
    }
  }, a.overdue))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      bottom: 88,
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 20px',
      borderRadius: 16,
      background: 'var(--grad-primary)',
      color: '#fff',
      font: '800 13px var(--font-core)',
      boxShadow: 'var(--shadow-button)',
      zIndex: 6
    }
  }, "Log call"), /*#__PURE__*/React.createElement(AndroidNav, {
    tab: tab,
    onTab: setTab
  }));
}
Object.assign(window, {
  AndroidApp
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-mobile/AndroidScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-mobile/IosScreens.jsx
try { (() => {
const M = window.SecondBrainDesignSystem_3cef5c;
const GROUND = 'radial-gradient(700px 420px at 92% -6%,#dbe7f2 0%,rgba(219,231,242,0) 62%),#eef1f5';
const TABS = [['brief', 'Brief'], ['accounts', 'Accounts'], ['reminders', 'Reminders'], ['catalog', 'Catalog'], ['more', 'More']];
function IosTabBar({
  tab,
  onTab
}) {
  const {
    Icon
  } = M;
  const glyph = {
    brief: 'brief',
    accounts: 'accounts',
    reminders: 'reminders',
    catalog: 'catalog',
    more: 'settings'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 14,
      right: 14,
      bottom: 26,
      height: 62,
      borderRadius: 24,
      background: 'rgba(32,38,46,.93)',
      backdropFilter: 'blur(14px)',
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      alignItems: 'center',
      padding: '0 6px',
      zIndex: 5
    }
  }, TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t[0],
    onClick: () => onTab(t[0]),
    style: {
      border: 0,
      background: 'none',
      cursor: 'pointer',
      height: 48,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      color: tab === t[0] ? '#fff' : 'var(--ink-200-dark)',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: glyph[t[0]],
    size: 19,
    weight: tab === t[0] ? 2 : 1.7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: '.04em'
    }
  }, t[1]))));
}
function IosHeader() {
  const {
    Icon
  } = M;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 12,
      background: 'var(--grad-primary)',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      font: '800 12px/1 var(--font-core)',
      letterSpacing: '-.02em'
    }
  }, "SB"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Wednesday \xB7 Aug 6"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 15px/1.2 var(--font-core)',
      letterSpacing: '-.02em',
      marginTop: 2
    }
  }, "Horatio Ozsvath")), /*#__PURE__*/React.createElement("button", {
    style: {
      marginLeft: 'auto',
      width: 44,
      height: 44,
      borderRadius: 999,
      border: '1px solid var(--border-soft)',
      background: 'var(--surface)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--ink-500)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 17,
    weight: 2
  })));
}
function IosBrief({
  onOpenSheet
}) {
  const {
    Chip
  } = M;
  const q = window.QUEUE[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IosHeader, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 40,
      padding: '0 14px',
      borderRadius: 999,
      background: 'var(--surface-dark)',
      color: 'var(--text-on-dark)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--sky-bright)',
      flex: 'none',
      animation: 'fl-pulse 1.6s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-200-dark)',
      flex: 'none'
    }
  }, "Up next"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'var(--on-dark-coral)'
    }
  }, "9:30 \xB7 Kootenay Co-op quote overdue"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 10.5,
      fontWeight: 800,
      color: 'var(--sky-bright)',
      flex: 'none'
    }
  }, "+4")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      borderRadius: 24,
      background: 'var(--surface)',
      padding: 18,
      boxShadow: 'var(--shadow-card)',
      animation: 'fl-rise .6s cubic-bezier(.22,1,.36,1) both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 26px/1.12 var(--font-core)',
      letterSpacing: 'var(--track-value)'
    }
  }, "Five accounts need you today"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      background: 'var(--surface-inset)',
      padding: '12px 14px',
      border: '1px solid var(--problem-edge)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Revenue at risk"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 22px/1 var(--font-core)',
      letterSpacing: 'var(--track-value)',
      marginTop: 7,
      color: 'var(--problem-text)'
    }
  }, "$544K")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      background: 'var(--surface-inset)',
      padding: '12px 14px',
      border: '1px solid var(--healthy-edge)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Cleared"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 22px/1 var(--font-core)',
      letterSpacing: 'var(--track-value)',
      marginTop: 7,
      color: 'var(--healthy-text)'
    }
  }, "3 / 8")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '2px 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Focus queue"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 10.5,
      fontWeight: 800,
      color: 'var(--slate-light)'
    }
  }, "1 of 5")), /*#__PURE__*/React.createElement("div", {
    onClick: onOpenSheet,
    style: {
      flex: 'none',
      borderRadius: 22,
      background: 'var(--surface)',
      padding: 18,
      border: '1px solid var(--problem)',
      boxShadow: 'var(--shadow-row-hover)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 18px/1.2 var(--font-core)',
      letterSpacing: 'var(--track-section-head)'
    }
  }, q.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--ink-300)',
      marginTop: 5
    }
  }, q.id, " \xB7 Grocery \xB7 63 sites"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 12,
      borderRadius: 999,
      padding: '6px 12px',
      background: 'var(--problem-tint)',
      border: '1px solid var(--problem-edge)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: 'var(--problem)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: 'var(--problem-text)'
    }
  }, "Revenue down 98% YoY \xB7 $544,656")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      background: 'var(--surface-hover-2)',
      padding: '13px 15px',
      marginTop: 12,
      fontSize: 12.5,
      lineHeight: 1.55,
      color: 'var(--slate-deep)'
    }
  }, q.opener), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 7,
      marginTop: 12
    }
  }, [['Tickets', '6', 'var(--problem-text)'], ['Health', '58', 'var(--slate-light)'], ['Last order', '116d', 'var(--ink)']].map(s => /*#__PURE__*/React.createElement("div", {
    key: s[0],
    style: {
      borderRadius: 14,
      background: 'var(--surface-inset)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, s[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 15px/1 var(--font-core)',
      marginTop: 6,
      color: s[2]
    }
  }, s[1])))), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 14,
      width: '100%',
      height: 48,
      border: 0,
      borderRadius: 999,
      background: 'var(--grad-primary)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: 800,
      letterSpacing: '.04em',
      boxShadow: 'var(--shadow-button)'
    }
  }, "Log call")), window.QUEUE.slice(1, 3).map((f, n) => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    style: {
      flex: 'none',
      borderRadius: 20,
      background: 'rgba(255,255,255,.8)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 24px/1 var(--font-core)',
      color: 'rgba(27,31,36,.16)'
    }
  }, n + 2), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 14px/1.2 var(--font-core)',
      letterSpacing: '-.01em'
    }
  }, f.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 800,
      color: 'var(--problem-text)',
      marginTop: 7
    }
  }, f.signal))));
}
function IosAccounts() {
  const CHIPS = ['All 183', 'At risk 42', 'No order 90d+', 'Tickets open', 'Contract ≤ 90d'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Book of business"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 22px/1.1 var(--font-core)',
      letterSpacing: 'var(--track-page-title)',
      marginTop: 6
    }
  }, "My Accounts")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      gap: 7,
      overflowX: 'auto',
      paddingBottom: 2,
      scrollbarWidth: 'none'
    }
  }, CHIPS.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      flex: 'none',
      height: 38,
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      borderRadius: 999,
      fontSize: 11.5,
      fontWeight: 800,
      whiteSpace: 'nowrap',
      background: i === 0 ? 'var(--grad-primary)' : 'var(--surface)',
      color: i === 0 ? '#fff' : 'var(--ink-600)',
      border: i === 0 ? '0' : '1px solid var(--border-soft)'
    }
  }, c))), window.ACCOUNTS.slice(0, 7).map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      flex: 'none',
      borderRadius: 18,
      background: 'var(--surface)',
      padding: '14px 16px',
      border: '1px solid ' + (a.score < 35 ? 'var(--problem)' : 'var(--dormant)')
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 13.5px/1.25 var(--font-core)',
      letterSpacing: '-.01em'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 22px/1 var(--font-core)',
      letterSpacing: 'var(--track-value)',
      color: a.score < 35 ? 'var(--problem-text)' : 'var(--slate-light)'
    }
  }, a.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      fontSize: 10.5,
      fontWeight: 800,
      color: 'var(--problem-text)'
    }
  }, a.overdue)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ink-300)',
      marginTop: 7
    }
  }, a.id, " \xB7 ", a.sector, " \xB7 score ", a.score, " \xB7 ", a.tickets, " tickets"))));
}
function IosSheet({
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim)',
      backdropFilter: 'var(--blur-scrim)',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      height: '78%',
      background: 'var(--surface)',
      borderRadius: '24px 24px 0 0',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fl-rise .45s cubic-bezier(.22,1,.36,1) both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 0 4px',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 5,
      borderRadius: 999,
      background: 'rgba(27,31,36,.18)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: 'auto',
      padding: '8px 16px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, "Account \xB7 Grocery \xB7 Ottawa"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 22px/1.12 var(--font-core)',
      letterSpacing: 'var(--track-page-title)',
      marginTop: 8
    }
  }, "Farm Boy Company Inc"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      marginTop: 14,
      paddingBottom: 2,
      scrollbarWidth: 'none'
    }
  }, [['At risk', '$544,656', 'var(--problem-text)'], ['Health', '58', 'var(--slate-light)'], ['Tickets', '6', 'var(--problem-text)'], ['Sites', '63', 'var(--teal-blue)']].map(s => /*#__PURE__*/React.createElement("div", {
    key: s[0],
    style: {
      flex: 'none',
      minWidth: 120,
      borderRadius: 16,
      background: 'var(--surface-inset)',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8.5,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)'
    }
  }, s[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 18px/1 var(--font-core)',
      marginTop: 7,
      color: s[2]
    }
  }, s[1])))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      marginTop: 20
    }
  }, "Open tickets"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 10
    }
  }, [['Trainyards lane 3 offline', 'TCK-40118', 'Escalated'], ['Scale calibration drift', 'TCK-39880', 'Open 41d'], ['Rideau printer replacement', 'TCK-39544', 'Waiting on parts']].map(t => /*#__PURE__*/React.createElement("div", {
    key: t[1],
    style: {
      borderRadius: 16,
      background: 'var(--surface-inset)',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 800
    }
  }, t[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      color: 'var(--ink-300)'
    }
  }, t[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 11,
      fontWeight: 800,
      color: 'var(--problem-text)'
    }
  }, t[2]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9.5,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: 'var(--ink-300)',
      marginTop: 20
    }
  }, "Watch out"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      background: 'var(--problem-tint)',
      padding: '13px 15px',
      marginTop: 10,
      fontSize: 12.5,
      lineHeight: 1.55,
      color: 'var(--problem-deep)'
    }
  }, "Dave escalated the Trainyards lane twice in July. Lead with it, do not lead with pricing.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      gap: 8,
      padding: '12px 16px 26px',
      borderTop: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 48,
      border: 0,
      borderRadius: 999,
      background: 'var(--grad-primary)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: 800,
      boxShadow: 'var(--shadow-button)'
    }
  }, "Log call"), /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 48,
      borderRadius: 999,
      border: '1px solid var(--border-soft)',
      background: 'var(--surface)',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: 700,
      color: '#2c353f'
    }
  }, "Build quote"))));
}
function IosApp() {
  const [tab, setTab] = React.useState('brief');
  const [sheet, setSheet] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-core)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: GROUND,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: 'auto',
      padding: '56px 14px 100px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, tab === 'brief' ? /*#__PURE__*/React.createElement(IosBrief, {
    onOpenSheet: () => setSheet(true)
  }) : null, tab === 'accounts' ? /*#__PURE__*/React.createElement(IosAccounts, null) : null, tab !== 'brief' && tab !== 'accounts' ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      background: 'var(--surface)',
      padding: '32px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 18px var(--font-core)',
      letterSpacing: '-.02em'
    }
  }, TABS.find(t => t[0] === tab)[1]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-500)',
      marginTop: 8,
      lineHeight: 1.6
    }
  }, "Not part of the mobile pass in the source. Nothing invented in its place.")) : null), /*#__PURE__*/React.createElement(IosTabBar, {
    tab: tab,
    onTab: setTab
  }), sheet ? /*#__PURE__*/React.createElement(IosSheet, {
    onClose: () => setSheet(false)
  }) : null);
}
Object.assign(window, {
  IosApp
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-mobile/IosScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-mobile/android-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// Android.jsx — Simplified Android (Material 3) device frame
// Status bar + top app bar + content + gesture nav + keyboard.
// Based on Figma M3 spec. No dependencies, no image assets.
// Exports (to window): AndroidDevice, AndroidStatusBar, AndroidAppBar, AndroidListItem, AndroidNavBar, AndroidKeyboard
//
// Usage — wrap your screen content in <AndroidDevice> to get the bezel, status
// bar and gesture nav (props: title, large, keyboard, dark):
//
//   <AndroidDevice title="Inbox" large>
//     ...your screen content...
//   </AndroidDevice>
//   <AndroidDevice title="Compose" keyboard>…</AndroidDevice>
/* END USAGE */

const MD_C = {
  surface: '#f4fbf8',
  surfaceVariant: '#dae5e1',
  inverseOnSurface: '#ecf2ef',
  secondaryContainer: '#cde8e1',
  primaryFixedDim: '#83d5c6',
  onSurface: '#171d1b',
  onSurfaceVar: '#49454f',
  onPrimaryContainer: '#00201c',
  primary: '#006a60',
  frameBorder: 'rgba(116,119,117,0.5)'
};

// ─────────────────────────────────────────────────────────────
// Status bar (time left, wifi/cell/battery right)
// ─────────────────────────────────────────────────────────────
function AndroidStatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : MD_C.onSurface;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.25,
      lineHeight: '20px',
      color: c
    }
  }, "9:30")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 8,
      transform: 'translateX(-50%)',
      width: 24,
      height: 24,
      borderRadius: 100,
      background: '#2e2e2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      paddingRight: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.67 14.67V1.33L1.33 14.67h13.34z",
    fill: c
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.75",
    y: "2",
    width: "8.5",
    height: "13",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5.5",
    y: "0.9",
    width: "5",
    height: "2",
    rx: "0.5",
    fill: c
  }))));
}

// ─────────────────────────────────────────────────────────────
// Top app bar (Material 3 small/medium)
// ─────────────────────────────────────────────────────────────
function AndroidAppBar({
  title = 'Title',
  large = false
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: MD_C.onSurfaceVar,
      opacity: 0.3
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.surface,
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, iconDot, !large && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 22,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), iconDot), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 20px',
      fontSize: 28,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// List item (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidListItem({
  headline,
  supporting,
  leading
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      minHeight: 56,
      boxSizing: 'border-box',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, leading && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: MD_C.primary,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 500,
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: MD_C.onSurface,
      lineHeight: '24px'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: MD_C.onSurfaceVar,
      lineHeight: '20px'
    }
  }, supporting)));
}

// ─────────────────────────────────────────────────────────────
// Gesture nav bar (pill)
// ─────────────────────────────────────────────────────────────
function AndroidNavBar({
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 108,
      height: 4,
      borderRadius: 2,
      background: dark ? '#fff' : MD_C.onSurface,
      opacity: 0.4
    }
  }));
}

// ─────────────────────────────────────────────────────────────
// Device frame — wraps everything
// ─────────────────────────────────────────────────────────────
function AndroidDevice({
  children,
  width = 412,
  height = 892,
  dark = false,
  title,
  large = false,
  keyboard = false
}) {
  return (
    /*#__PURE__*/
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    React.createElement("div", {
      "data-om-starter": "android-frame",
      style: {
        width,
        height,
        borderRadius: 18,
        overflow: 'hidden',
        background: dark ? '#1d1b20' : MD_C.surface,
        border: `8px solid ${MD_C.frameBorder}`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }
    }, /*#__PURE__*/React.createElement(AndroidStatusBar, {
      dark: dark
    }), title !== undefined && /*#__PURE__*/React.createElement(AndroidAppBar, {
      title: title,
      large: large
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto'
      }
    }, children), keyboard && /*#__PURE__*/React.createElement(AndroidKeyboard, null), /*#__PURE__*/React.createElement(AndroidNavBar, {
      dark: dark
    }))
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — Gboard (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidKeyboard() {
  let _k = 0;
  const key = (l, {
    flex = 1,
    bg = MD_C.surface,
    r = 6,
    minW,
    fs = 21
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: _k++,
    style: {
      height: 46,
      borderRadius: r,
      flex,
      minWidth: minW,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, system-ui',
      fontSize: fs,
      color: MD_C.onPrimaryContainer
    }
  }, l);
  const row = (keys, style = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      ...style
    }
  }, keys.map(l => key(l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.inverseOnSurface,
      padding: '0 8px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], {
    padding: '0 20px'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('', {
    bg: MD_C.surfaceVariant
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 7,
      minWidth: 274
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l))), key('', {
    bg: MD_C.surfaceVariant
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('?123', {
    bg: MD_C.secondaryContainer,
    r: 100,
    minW: 58,
    fs: 14
  }), key(',', {
    bg: MD_C.surfaceVariant
  }), key('', {
    flex: 3,
    minW: 154
  }), key('.', {
    bg: MD_C.surfaceVariant
  }), key('', {
    bg: MD_C.primaryFixedDim,
    r: 100,
    minW: 58
  }))));
}
Object.assign(window, {
  AndroidDevice,
  AndroidStatusBar,
  AndroidAppBar,
  AndroidListItem,
  AndroidNavBar,
  AndroidKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-mobile/android-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/secondbrain-mobile/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return (
    /*#__PURE__*/
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    React.createElement("div", {
      "data-om-starter": "ios-frame",
      style: {
        width,
        height,
        borderRadius: 48,
        overflow: 'hidden',
        position: 'relative',
        background: dark ? '#000' : '#F2F2F7',
        boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
        fontFamily: '-apple-system, system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 11,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 126,
        height: 37,
        borderRadius: 24,
        background: '#000',
        zIndex: 50
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }
    }, /*#__PURE__*/React.createElement(IOSStatusBar, {
      dark: dark
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
      title: title,
      dark: dark
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto'
      }
    }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
      dark: dark
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 8,
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 139,
        height: 5,
        borderRadius: 100,
        background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
      }
    })))
  );
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/secondbrain-mobile/ios-frame.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ICONS = __ds_scope.ICONS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.DataRow = __ds_scope.DataRow;

__ds_ns.LegendPill = __ds_scope.LegendPill;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.TableHeader = __ds_scope.TableHeader;

__ds_ns.TableRow = __ds_scope.TableRow;

__ds_ns.TableGrid = __ds_scope.TableGrid;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.ModalBody = __ds_scope.ModalBody;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.AiOpener = __ds_scope.AiOpener;

__ds_ns.DarkPanel = __ds_scope.DarkPanel;

__ds_ns.DarkPanelLabel = __ds_scope.DarkPanelLabel;

__ds_ns.DarkPanelRule = __ds_scope.DarkPanelRule;

__ds_ns.RailItem = __ds_scope.RailItem;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.SectionHead = __ds_scope.SectionHead;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.SidebarBrand = __ds_scope.SidebarBrand;

__ds_ns.SidebarUser = __ds_scope.SidebarUser;

__ds_ns.Ticker = __ds_scope.Ticker;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Inset = __ds_scope.Inset;

__ds_ns.Label = __ds_scope.Label;

})();
