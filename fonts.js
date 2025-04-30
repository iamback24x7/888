    // fonts.js

// Helper function for simple character mapping
const mapChars = (map) => (text) => {
  return text.split('').map(char => {
    if (map[char]) return map[char];
    if (map[char.toLowerCase()]) return map[char.toLowerCase()];
    return char;
  }).join('');
};


// Helper function for applying combining characters
const applyCombiningChar = (combiningChar) => (text) => {
  return text.split('').map(char => char + combiningChar).join('');
};

// Helper function for wrapping characters
const wrapChars = (prefix, suffix) => (text) => {
    // Handle cases where suffix might depend on the character itself (like combining chars)
    if (typeof suffix === 'function') {
        return text.split('').map(char => prefix + char + suffix(char)).join('');
    }
    return text.split('').map(char => prefix + char + suffix).join('');
};


// Define character mappings (extensive list)
// Ensure keys are lowercase for case-insensitive mapping in mapChars helper
const mappings = {
  rounded: { 'a': 'ᗩ', 'b': 'ᗷ', 'c': 'ᑕ', 'd': 'ᗪ', 'e': 'E', 'f': 'ᖴ', 'g': 'G', 'h': 'ᕼ', 'i': 'I', 'j': 'ᒍ', 'k': 'K', 'l': 'ᒪ', 'm': 'ᗰ', 'n': 'ᑎ', 'o': 'O', 'p': 'ᑭ', 'q': 'ᑫ', 'r': 'ᖇ', 's': 'ᔕ', 't': 'T', 'u': 'ᑌ', 'v': 'ᐯ', 'w': 'ᗯ', 'x': '᙭', 'y': 'Y', 'z': 'ᘔ' },
  symbolic: { 'a': 'ꬤ', 'b': 'ꞗ', 'c': 'ꮯ', 'd': 'ꕷ', 'e': 'ꬲ', 'f': 'ꝭ', 'g': 'ꬶ', 'h': 'ꑛ', 'i': 'ꭵ', 'j': 'ꭻ', 'k': 'ꞙ', 'l': '꒒', 'm': 'ꕮ', 'n': 'ꬼ', 'o': 'ꭴ', 'p': 'ꮷ', 'q': 'ꝗ', 'r': 'ꭱ', 's': 'ꮪ', 't': 'ꔋ', 'u': 'ꞹ', 'v': 'ꝟ', 'w': 'ꟽ', 'x': 'ꭗ', 'y': 'ꝟ', 'z': 'ꮓ' }, // Mix of cases from example
  vintage: { 'a': 'Ꭿ', 'b': 'Ᏸ', 'c': 'Ꮸ', 'd': 'Ꭰ', 'e': 'Ꭼ', 'f': 'Ꮀ', 'g': 'Ꮆ', 'h': 'Ꮋ', 'i': 'Ꭸ', 'j': 'Ꭻ', 'k': 'Ꮶ', 'l': 'Ꮮ', 'm': 'Ꮇ', 'n': 'Ꮑ', 'o': 'Ꮎ', 'p': 'Ꮲ', 'q': 'Ꭴ', 'r': 'Ꮢ', 's': 'Ꮥ', 't': 'Ꮦ', 'u': 'Ꮼ', 'v': 'Ꮙ', 'w': 'Ꮗ', 'x': 'Ꮂ', 'y': 'Ꭹ', 'z': 'Ꮓ' },
  cursive: { 'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏' },
  boldCursive: { 'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃' },
  doubleStruck: { 'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫', 'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ' },
  gothic: { 'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷', 'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ' },
  boldFraktur: { 'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋', 'g': '𝖌', 'h': '𝖍', 'i': '𝖎', 'j': '𝖏', 'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓', 'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙', 'u': '𝖚', 'v': '𝖛', 'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟', 'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲', 'H': '𝕳', 'I': '𝕴', 'J': '𝕵', 'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹', 'O': '𝕺', 'P': '𝕻', 'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿', 'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃', 'Y': '𝖄', 'Z': '𝖅' },
  historical: { 'a': 'ꍏ', 'b': 'ꌃ', 'c': 'ꉓ', 'd': 'ꀷ', 'e': 'ꍟ', 'f': 'ꄘ', 'g': 'ꁍ', 'h': 'ꃅ', 'i': 'ꀤ', 'j': 'ꀭ', 'k': 'ꀘ', 'l': '꒒', 'm': 'ꂵ', 'n': 'ꊮ', 'o': 'ꂦ', 'p': 'ꉣ', 'q': 'ꆰ', 'r': 'ꋪ', 's': 'ꌗ', 't': '꓄', 'u': 'ꀎ', 'v': 'ꏝ', 'w': 'ꅏ', 'x': 'ꉧ', 'y': 'ꌩ', 'z': 'ꁴ' },
  tribal: { 'a': 'ል', 'b': 'ጌ', 'c': 'ር', 'd': 'ዕ', 'e': 'ቿ', 'f': 'ፑ', 'g': 'ኗ', 'h': 'ዘ', 'i': 'ጎ', 'j': 'ጋ', 'k': 'ጕ', 'l': 'ረ', 'm': 'ጠ', 'n': 'ክ', 'o': 'ዐ', 'p': 'የ', 'q': 'ዒ', 'r': 'ዪ', 's': 'ነ', 't': 'ፕ', 'u': 'ሀ', 'v': 'ሀ', 'w': 'ሠ', 'x': 'ሸ', 'y': 'ሃ', 'z': 'ጊ' },
  graceful: { 'a': 'მ', 'b': 'ც', 'c': 'ƈ', 'd': 'ძ', 'e': 'ε', 'f': 'բ', 'g': 'ց', 'h': 'հ', 'i': 'ɿ', 'j': 'ʝ', 'k': 'ƙ', 'l': 'ʅ', 'm': 'ʍ', 'n': 'ղ', 'o': 'օ', 'p': 'ρ', 'q': 'զ', 'r': 'ɾ', 's': 'ʂ', 't': 'է', 'u': 'υ', 'v': 'ν', 'w': 'ա', 'x': 'χ', 'y': 'ყ', 'z': 'չ' },
  bold: { 'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇', 'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭' },
  sansBoldItalic: { 'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟', 'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩', 'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯', 'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅', 'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏', 'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕' },
  monospace: { 'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣', 'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸', 'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁', 'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉' },
  wide: { 'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ', 'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ' },
  sansSerif: { 'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿', 'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇', 'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏', 'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓', 'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹' },
  sansItalic: { 'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻', 'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡' },
  sansBold: { 'a': '𝘀', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇', 'A': '𝗦', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭' },
  italic: { 'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧', 'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍' },
  boldItalic: { 'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛', 'A': '𝑩', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁' },
  parenthesized: { 'a': '⒜', 'b': '⒝', 'c': '⒞', 'd': '⒟', 'e': '⒠', 'f': '⒡', 'g': '⒢', 'h': '⒣', 'i': '⒤', 'j': '⒥', 'k': '⒦', 'l': '⒧', 'm': '⒨', 'n': '⒩', 'o': '⒪', 'p': '⒫', 'q': '⒬', 'r': '⒭', 's': '⒮', 't': '⒯', 'u': '⒰', 'v': '⒱', 'w': '⒲', 'x': '⒳', 'y': '⒴', 'z': '⒵', 'A': '🄐', 'B': '🄑', 'C': '🄒', 'D': '🄓', 'E': '🄔', 'F': '🄕', 'G': '🄖', 'H': '🄗', 'I': '🄘', 'J': '🄙', 'K': '🄚', 'L': '🄛', 'M': '🄜', 'N': '🄝', 'O': '🄞', 'P': '🄟', 'Q': '🄠', 'R': '🄡', 'S': '🄢', 'T': '🄣', 'U': '🄤', 'V': '🄥', 'W': '🄦', 'X': '🄧', 'Y': '🄨', 'Z': '🄩' },
  smallCapital: { 'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'q', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ' }, // Only lowercase maps to small caps
  emoji: { 'a': '🅰️', 'b': '🅱️', 'c': '↪️', 'd': '▶️', 'e': '📧', 'f': '🎏', 'g': '⛽', 'h': '♓', 'i': 'ℹ️', 'j': '🎷', 'k': '🎋', 'l': '👢', 'm': 'Ⓜ️', 'n': '♑', 'o': '🅾️', 'p': '🅿️', 'q': '🍳', 'r': '®️', 's': '💲', 't': '✝️', 'u': '⛎', 'v': '♈', 'w': '〰️', 'x': '❎', 'y': '✌️', 'z': '💤' },
  oldItalic: { 'a': '𐌀', 'b': '𐌁', 'c': '𐌂', 'd': '𐌃', 'e': '𐌄', 'f': '𐌅', 'g': '𐌂', 'h': '𐌇', 'i': '𐌉', 'j': '𐌉', 'k': '𐌊', 'l': '𐌋', 'm': '𐌌', 'n': '𐌍', 'o': 'Ꝋ', 'p': '𐌐', 'q': '𐌒', 'r': '𐌓', 's': '𐌔', 't': '𐌕', 'u': '𐌖', 'v': '𐌖', 'w': '𐌖𐌖', 'x': '𐌗', 'y': '𐌙', 'z': '𐌆' },
  square: { 'a': '🅰', 'b': '🅱', 'c': '🅲', 'd': '🅳', 'e': '🅴', 'f': '🅵', 'g': '🅶', 'h': '🅷', 'i': '🅸', 'j': '🅹', 'k': '🅺', 'l': '🅻', 'm': '🅼', 'n': '🅽', 'o': '🅾', 'p': '🅿', 'q': '🆀', 'r': '🆁', 's': '🆂', 't': '🆃', 'u': '🆄', 'v': '🆅', 'w': '🆆', 'x': '🆇', 'y': '🆈', 'z': '🆉' },
  bubble: { 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ', 'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ' },
  block: { 'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉' },
  darkBubble: { 'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙', 'k': '🅚', 'l': '🅛', 'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣', 'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨', 'z': '🅩' },
  cute: { 'a': 'ꍏ', 'b': 'ꌃ', 'c': 'ꏳ', 'd': 'ꀷ', 'e': 'ꍟ', 'f': 'ꄘ', 'g': 'ꁍ', 'h': 'ꃅ', 'i': 'ꀤ', 'j': 'ꀭ', 'k': 'ꀘ', 'l': '꒒', 'm': 'ꂵ', 'n': 'ꊮ', 'o': 'ꉻ', 'p': 'ꉣ', 'q': 'ꆰ', 'r': 'ꋪ', 's': 'ꌚ', 't': '꓄', 'u': 'ꀎ', 'v': 'ꏝ', 'w': 'ꅏ', 'x': 'ꉧ', 'y': 'ꌩ', 'z': 'ꁴ' },
  upsideDown: { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'", '?': '¿', '!': '¡', "'": ',', '"': '„', '`': ',', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾' },
  small: { 'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᑫ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ' },
  ancient: {'A': '𒀀', 'B': '𒁉', 'C': '𒃲', 'D': '𒁕', 'E': '𒂊', 'F': '𒆬', 'G': '𒄀', 'H': '𒄩','I': '𒄿', 'J': '𒋛', 'K': '𒆠', 'L': '𒇷', 'M': '𒈠', 'N': '𒉌', 'O': '𒍥', 'P': '𒁍','Q': '𒆸', 'R': '𒊒', 'S': '𒊓', 'T': '𒋾', 'U': '𒌋', 'V': '𒍑', 'W': '𒉿', 'X': '𒐊','Y': '𒅆', 'Z': '𒍣','a': '𒀀', 'b': '𒁉', 'c': '𒃲', 'd': '𒁕', 'e': '𒂊', 'f': '𒆬', 'g': '𒄀', 'h': '𒄩','i': '𒄿', 'j': '𒋛', 'k': '𒆠', 'l': '𒇷', 'm': '𒈠', 'n': '𒉌', 'o': '𒍥', 'p': '𒁍','q': '𒆸', 'r': '𒊒', 's': '𒊓', 't': '𒋾', 'u': '𒌋', 'v': '𒍑', 'w': '𒉿', 'x': '𒐊','y': '𒅆', 'z': '𒍣'},
  subscript: { 'a': 'ₐ', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'ₑ', 'f': 'f', 'g': 'g', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'q': 'q', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'w': 'w', 'x': 'ₓ', 'y': 'y', 'z': 'z' }, // Limited chars
  wavy: { 'a': 'ꍏ', 'b': 'ꌃ', 'c': 'ꏸ', 'd': 'ꀷ', 'e': 'ꍟ', 'f': 'ꄘ', 'g': 'ꁍ', 'h': 'ꃅ', 'i': 'ꀤ', 'j': 'ꀭ', 'k': 'ꀘ', 'l': '꒒', 'm': 'ꂵ', 'n': 'ꊰ', 'o': 'ꂦ', 'p': 'ꉣ', 'q': 'ꆰ', 'r': 'ꋪ', 's': 'ꌚ', 't': '꓄', 'u': 'ꀎ', 'v': 'ꏝ', 'w': 'ꅏ', 'x': 'ꉧ', 'y': 'ꐞ', 'z': 'ꁴ' },
  eastern: { 'a': '卂', 'b': '乃', 'c': '匚', 'd': 'ᗪ', 'e': '乇', 'f': '千', 'g': 'Ꮆ', 'h': '卄', 'i': '丨', 'j': 'ﾌ', 'k': 'Ҡ', 'l': 'ㄥ', 'm': '爪', 'n': '几', 'o': 'ㄖ', 'p': '卩', 'q': 'Ɋ', 'r': '尺', 's': '丂', 't': '丁', 'u': 'ㄩ', 'v': 'ᐯ', 'w': '山', 'x': '乂', 'y': 'ㄚ', 'z': '乙' },
  backwardFlip: { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'Ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ὁ', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Ʌ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z' },
  mirror: { 'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'Ꮈ', 'g': 'ǫ', 'h': 'ʜ', 'i': 'i', 'j': 'ꞁ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 'ƨ', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ʏ', 'z': 'ƹ', 'A': 'A', 'B': 'B', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'ꟻ', 'G': 'Ꭾ', 'H': 'H', 'I': 'I', 'J': 'ᒐ', 'K': '⋊', 'L': '⅃', 'M': 'M', 'N': 'Ͷ', 'O': 'O', 'P': 'ꟼ', 'Q': 'Ọ', 'R': 'Я', 'S': 'Ƨ', 'T': 'T', 'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Ƹ' },
  blendedAsian: { 'a': 'ﾑ', 'b': '乃', 'c': 'ᄃ', 'd': 'り', 'e': '乇', 'f': 'ｷ', 'g': 'ム', 'h': 'ん', 'i': 'ﾉ', 'j': 'ﾌ', 'k': 'ズ', 'l': 'ﾚ', 'm': 'ﾶ', 'n': '刀', 'o': 'の', 'p': 'ｱ', 'q': 'ゐ', 'r': '尺', 's': '丂', 't': 'ｲ', 'u': 'ひ', 'v': '√', 'w': 'W', 'x': 'ﾒ', 'y': 'ﾘ', 'z': '乙' },
  soft: { 'a': 'ꍏ', 'b': 'ꌃ', 'c': 'ꏸ', 'd': 'ꀷ', 'e': 'ꍟ', 'f': 'ꄘ', 'g': 'ꁍ', 'h': 'ꃅ', 'i': 'ꀤ', 'j': 'ꀭ', 'k': 'ꀘ', 'l': '꒒', 'm': 'ꂵ', 'n': 'ꈤ', 'o': 'ꂦ', 'p': 'ꉣ', 'q': 'ꆰ', 'r': 'ꋪ', 's': 'ꌚ', 't': '꓄', 'u': 'ꀎ', 'v': 'ꏝ', 'w': 'ꅏ', 'x': 'ꉧ', 'y': 'ꌩ', 'z': 'ꁴ' },
  prime: { 'a': 'α', 'b': 'ɓ', 'c': '૮', 'd': '∂', 'e': 'ε', 'f': 'ƒ', 'g': 'ɠ', 'h': 'ɦ', 'i': 'เ', 'j': 'ʝ', 'k': 'ҡ', 'l': 'ℓ', 'm': 'ɱ', 'n': 'ɳ', 'o': 'σ', 'p': 'ρ', 'q': 'φ', 'r': '૨', 's': 'ร', 't': 'ƭ', 'u': 'µ', 'v': 'ѵ', 'w': 'ω', 'x': 'א', 'y': 'ყ', 'z': 'ƶ' },
  fantasy: { 'a': 'α', 'b': 'в', 'c': 'ϲ', 'd': '∂', 'e': 'є', 'f': 'ғ', 'g': 'ɠ', 'h': 'н', 'i': 'ι', 'j': 'ϳ', 'k': 'κ', 'l': 'ℓ', 'm': 'ʍ', 'n': 'η', 'o': 'σ', 'p': 'ρ', 'q': 'զ', 'r': 'я', 's': 'ѕ', 't': 'ŧ', 'u': 'υ', 'v': 'ν', 'w': 'ω', 'x': 'χ', 'y': 'γ', 'z': 'ɀ', 'A': '∀', 'B': '𐌁', 'C': '☾', 'D': 'ᗡ', 'E': '∃', 'F': 'Ғ', 'G': '⊛', 'H': 'ℍ', 'I': '¦', 'J': 'ℸ', 'K': 'Ӄ', 'L': 'ᒪ', 'M': '∇', 'N': 'ℕ', 'O': '⊙', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': 'ϟ', 'T': '⊤', 'U': '∪', 'V': '∨', 'W': 'Ψ', 'X': 'Ӿ', 'Y': 'ϒ', 'Z': 'ℤ' },
  adaptive: { 'a': 'ɑ', 'b': 'ɓ', 'c': 'ϲ', 'd': '∂', 'e': 'ҽ', 'f': 'ƒ', 'g': 'ɠ', 'h': 'հ', 'i': 'í', 'j': 'յ', 'k': 'ƙ', 'l': 'Ӏ', 'm': 'ʍ', 'n': 'ղ', 'o': 'օ', 'p': 'ρ', 'q': 'զ', 'r': 'ɾ', 's': 'ѕ', 't': 'т', 'u': 'մ', 'v': 'ѵ', 'w': 'ա', 'x': '×', 'y': 'վ', 'z': 'Հ', 'A': 'ᗩ', 'B': 'ᗷ', 'C': 'ᑕ', 'D': 'ᗪ', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'ᕼ', 'I': 'I', 'J': 'ᒍ', 'K': 'K', 'L': 'ᒪ', 'M': 'ᗰ', 'N': 'ᑎ', 'O': 'O', 'P': 'ᑭ', 'Q': 'ᑫ', 'R': 'ᖇ', 'S': 'ᔕ', 'T': 'T', 'U': 'ᑌ', 'V': 'ᐯ', 'W': 'ᗯ', 'X': '᙭', 'Y': 'Y', 'Z': 'ᘔ' },
  varied: { 'a': 'α', 'b': 'в', 'c': '¢', 'd': '∂', 'e': 'є', 'f': 'ƒ', 'g': 'g', 'h': 'н', 'i': 'ι', 'j': 'נ', 'k': 'к', 'l': 'ℓ', 'm': 'м', 'n': 'η', 'o': 'σ', 'p': 'ρ', 'q': 'q', 'r': 'я', 's': 'ѕ', 't': 'т', 'u': 'υ', 'v': 'ʋ', 'w': 'ω', 'x': 'χ', 'y': 'у', 'z': 'z' },
  striped: { 'a': 'ⱥ', 'b': 'ƀ', 'c': 'ȼ', 'd': 'đ', 'e': 'ɇ', 'f': 'f', 'g': 'ǥ', 'h': 'ħ', 'i': 'ɨ', 'j': 'ɉ', 'k': 'ꝁ', 'l': 'ł', 'm': 'm', 'n': 'n', 'o': 'ø', 'p': 'ꝑ', 'q': 'ꝗ', 'r': 'ɍ', 's': 's', 't': 'ŧ', 'u': 'ʉ', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ɏ', 'z': 'ƶ', 'A': 'Ⱥ', 'B': 'Ƀ', 'C': 'Ȼ', 'D': 'Đ', 'E': 'Ɇ', 'F': 'F', 'G': 'Ǥ', 'H': 'Ħ', 'I': 'Ɨ', 'J': 'Ɉ', 'K': 'Ꝁ', 'L': 'Ł', 'M': 'M', 'N': 'N', 'O': 'Ø', 'P': 'Ꝑ', 'Q': 'Ꝗ', 'R': 'Ɍ', 'S': 'S', 'T': 'Ŧ', 'U': 'Ʉ', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Ɏ', 'Z': 'Ƶ' },
  dreamy: { 'a': 'ᗩ', 'b': 'ᗷ', 'c': 'ᑕ', 'd': 'ᗪ', 'e': 'ᗴ', 'f': 'ᖴ', 'g': 'Ǥ', 'h': 'ᕼ', 'i': 'Ɨ', 'j': 'ᒎ', 'k': 'ᛕ', 'l': 'ᒪ', 'm': 'ᗰ', 'n': 'ᑎ', 'o': 'ᗝ', 'p': 'ᑭ', 'q': 'Ɋ', 'r': 'ᖇ', 's': 'ᔕ', 't': '丅', 'u': 'ᑌ', 'v': 'ᐯ', 'w': 'ᗯ', 'x': '᙭', 'y': 'Ƴ', 'z': '乙' },
  iconic: { 'a': 'ꍏ', 'b': 'ꌃ', 'c': 'ꉓ', 'd': 'ꀷ', 'e': 'ꍟ', 'f': 'ꄘ', 'g': 'ꁍ', 'h': 'ꃅ', 'i': 'ꀤ', 'j': 'ꀭ', 'k': 'ꀘ', 'l': '꒒', 'm': 'ꂵ', 'n': 'ꈤ', 'o': 'ꂦ', 'p': 'ꉣ', 'q': 'ꆰ', 'r': 'ꋪ', 's': 'ꌚ', 't': '꓄', 'u': 'ꀎ', 'v': 'ꏝ', 'w': 'ꅏ', 'x': 'ꉧ', 'y': 'ꌩ', 'z': 'ꁴ' },
  shadow: { 'a': 'ᗩ', 'b': 'ᗷ', 'c': 'ᑕ', 'd': 'ᗪ', 'e': 'E', 'f': 'ᖴ', 'g': 'G', 'h': 'ᕼ', 'i': 'I', 'j': 'ᒍ', 'k': 'K', 'l': 'ᒪ', 'm': 'ᗰ', 'n': 'ᑎ', 'o': 'O', 'p': 'ᑭ', 'q': 'ᑫ', 'r': 'ᖇ', 's': 'S', 't': 'T', 'u': 'ᑌ', 'v': 'ᐯ', 'w': 'ᗯ', 'x': '᙭', 'y': 'Y', 'z': 'ᘔ' }, // Uppercase S, T are different in example? Keeping consistent for now.
  modern: { 'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'q', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ' }, // Small caps again
  squiggle: { 'a': 'ค', 'b': '๒', 'c': 'ς', 'd': '๔', 'e': 'є', 'f': 'Ŧ', 'g': 'ﻮ', 'h': 'ђ', 'i': 'เ', 'j': 'ן', 'k': 'к', 'l': 'ɭ', 'm': '๓', 'n': 'ภ', 'o': '๏', 'p': 'ק', 'q': 'ợ', 'r': 'г', 's': 'ร', 't': 'Շ', 'u': 'ย', 'v': 'ש', 'w': 'ฬ', 'x': 'א', 'y': 'ץ', 'z': 'չ' },
  playful: { 'a': 'ą', 'b': 'ɓ', 'c': 'ȼ', 'd': 'ժ', 'e': 'ҽ', 'f': 'ƒ', 'g': 'ց', 'h': 'հ', 'i': 'ì', 'j': 'ʝ', 'k': 'ҟ', 'l': 'Ӏ', 'm': 'ʍ', 'n': 'ղ', 'o': 'օ', 'p': 'ք', 'q': 'զ', 'r': 'ɾ', 's': 'ʂ', 't': 'է', 'u': 'մ', 'v': 'ѵ', 'w': 'ա', 'x': '×', 'y': 'վ', 'z': 'Հ' },
  refined: { 'a': 'ɒ', 'b': 'ʙ', 'c': 'ɔ', 'd': 'ᴅ', 'e': 'ɘ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'q', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ' }, // Small caps again
  paint: { 'a': 'ą', 'b': 'ɓ', 'c': 'ȼ', 'd': 'ժ', 'e': 'ҽ', 'f': 'ƒ', 'g': 'ց', 'h': 'հ', 'i': 'ì', 'j': 'ʝ', 'k': 'ҟ', 'l': 'Ӏ', 'm': 'ʍ', 'n': 'ղ', 'o': 'օ', 'p': 'ք', 'q': 'զ', 'r': 'ɾ', 's': 'ʂ', 't': 'է', 'u': 'մ', 'v': 'ѵ', 'w': 'ա', 'x': '×', 'y': 'վ', 'z': 'Հ' },
  reverseStyle: { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ı', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ן', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z' },
  antique: { 'a': 'α', 'b': 'ɓ', 'c': '૮', 'd': '∂', 'e': 'ε', 'f': 'ƒ', 'g': 'ɠ', 'h': 'ɦ', 'i': 'เ', 'j': 'ʝ', 'k': 'ҡ', 'l': 'ℓ', 'm': 'ɱ', 'n': 'ɳ', 'o': 'σ', 'p': 'ρ', 'q': 'φ', 'r': '૨', 's': 'ร', 't': 'ƭ', 'u': 'µ', 'v': 'ѵ', 'w': 'ω', 'x': 'א', 'y': 'ყ', 'z': 'ƶ' },
  uniqueGlyph: { 'a': 'ⲁ', 'b': 'ⲃ', 'c': 'ⲥ', 'd': 'ⲇ', 'e': 'ⲉ', 'f': 'ϝ', 'g': 'ⳋ', 'h': 'ⲏ', 'i': 'ⳕ', 'j': 'ⳗ', 'k': 'ⲕ', 'l': 'ⳑ', 'm': 'ⲙ', 'n': 'ⲛ', 'o': 'ⲟ', 'p': 'ⲣ', 'q': 'q', 'r': 'ⲅ', 's': 'ⲋ', 't': 'ⲧ', 'u': 'υ', 'v': 'ⳳ', 'w': 'ⲱ', 'x': 'ⲭ', 'y': 'ⲩ', 'z': 'ⲍ' },
  decorative: { 'a': 'ᾄ', 'b': 'в', 'c': 'ƈ', 'd': 'ḋ', 'e': 'ἔ', 'f': 'ғ', 'g': 'ĝ', 'h': 'н', 'i': 'ἷ', 'j': 'ʝ', 'k': 'ќ', 'l': 'ł', 'm': 'м', 'n': 'ᾗ', 'o': 'ὄ', 'p': 'ῥ', 'q': 'ҩ', 'r': 'ʀ', 's': 'ʂ', 't': 'ҭ', 'u': 'ὗ', 'v': 'ν', 'w': 'ᾧ', 'x': 'ẋ', 'y': 'ẏ', 'z': 'ẓ' },
  minimalCharm: { 'a': 'ᥲ', 'b': 'b', 'c': 'ᥴ', 'd': 'd', 'e': 'ᥱ', 'f': 'f', 'g': 'g', 'h': 'h', 'i': 'ι', 'j': 'j', 'k': 'k', 'l': 'ᥣ', 'm': 'm', 'n': 'ᥒ', 'o': '᥆', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'ᥙ', 'v': '᥎', 'w': 'ᥕ', 'x': 'x', 'y': 'y', 'z': 'z' },
  gentle: { 'a': 'ɑ', 'b': 'ɓ', 'c': 'ɕ', 'd': 'ɖ', 'e': 'ҽ', 'f': 'ƒ', 'g': 'ɠ', 'h': 'ɦ', 'i': 'ɨ', 'j': 'ʝ', 'k': 'ƙ', 'l': 'ʅ', 'm': 'ɱ', 'n': 'ɳ', 'o': 'ɵ', 'p': 'ρ', 'q': 'ɋ', 'r': 'ɾ', 's': 'ʂ', 't': 'ʈ', 'u': 'ʉ', 'v': 'ʋ', 'w': 'ɯ', 'x': 'x', 'y': 'ɣ', 'z': 'ʐ' },
  staticFont: { 'a': 'ʌ', 'b': 'в', 'c': 'ƈ', 'd': 'ɖ', 'e': 'є', 'f': 'ƒ', 'g': 'ɠ', 'h': 'ɦ', 'i': 'ɪ', 'j': 'ʝ', 'k': 'ƙ', 'l': 'ʅ', 'm': 'ɱ', 'n': 'ɲ', 'o': 'ơ', 'p': 'ƥ', 'q': 'ʠ', 'r': 'ɾ', 's': 'ƨ', 't': 'ƭ', 'u': 'υ', 'v': 'ѵ', 'w': 'ɯ', 'x': 'x', 'y': 'ɣ', 'z': 'ʐ' },
  trendy: { 'a': 'ą', 'b': 'ɓ', 'c': 'ȼ', 'd': 'đ', 'e': 'ȅ', 'f': 'ƒ', 'g': 'ǥ', 'h': 'ħ', 'i': 'ɨ', 'j': 'ɉ', 'k': 'ҟ', 'l': 'ł', 'm': 'ɱ', 'n': 'ɲ', 'o': 'ø', 'p': 'ρ', 'q': 'ʠ', 'r': 'ɽ', 's': 'ʂ', 't': 'ŧ', 'u': 'ʉ', 'v': 'ʋ', 'w': '₩', 'x': 'ж', 'y': '¥', 'z': 'ƶ' },
  cyberpunk: {
    'a': '⟁', 'b': 'β', 'c': '⚡', 'd': '₫', 'e': '€', 'f': 'ƒ', 'g': '₲', 'h': 'ɥ', 'i': 'ι', 'j': 'ʝ', 'k': 'ƙ', 'l': 'ʟ', 'm': 'ɱ', 'n': 'и', 'o': 'ø', 'p': 'ρ', 'q': 'գ', 'r': 'ɹ', 's': 'ш', 't': 'τ', 'u': 'μ', 'v': 'ν', 'w': 'ω', 'x': 'χ', 'y': 'ү', 'z': 'ζ',
    'A': 'Α', 'B': 'Β', 'C': 'ℂ', 'D': 'Δ', 'E': 'Ε', 'F': 'Ϝ', 'G': 'Γ', 'H': 'Η', 'I': 'Ι', 'J': 'Ј', 'K': 'Κ', 'L': 'Λ', 'M': 'Μ', 'N': 'Ν', 'O': 'Ο', 'P': 'Π', 'Q': 'Q', 'R': 'Ρ', 'S': 'Ѕ', 'T': 'Τ', 'U': 'Υ', 'V': 'V', 'W': 'Ω', 'X': 'Χ', 'Y': 'Υ', 'Z': 'Ζ'
  },
  retro: {
    'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': '𝓰', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝒦', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': '𝒾', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒲', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': 'ℵ'
  },
  pixelated: {
    'a': '⎧', 'b': '𝒃', 'c': '𝒸', 'd': '𝒹', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': '𝓊', 'p': '𝓅', 'q': '𝒬', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': '𝒾', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒲', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': 'ℵ'
  },
  neon: {
    'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': '𝒼', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝒦', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': '𝓊', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
    'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': '𝒾', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒲', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': 'ℵ'
  }
};

// Combine font styles
// Use window.fontStyles to make it globally accessible
window.fontStyles = [
{ name: 'Cursive', convert: mapChars(mappings.cursive) },
  { name: 'Vintage', convert: mapChars(mappings.vintage) },
  { name: 'Symbolic', convert: mapChars(mappings.symbolic) },
  { name: 'Cyberpunk', convert: mapChars(mappings.cyberpunk) },
  { name: 'Bold Cursive', convert: mapChars(mappings.boldCursive) },
  { name: 'Double Struck', convert: mapChars(mappings.doubleStruck) },
  { name: 'Gothic', convert: mapChars(mappings.gothic) },
  { name: 'Retro', convert: mapChars(mappings.retro) },
  { name: 'Rounded', convert: mapChars(mappings.rounded) },
  { name: 'Bold Fraktur', convert: mapChars(mappings.boldFraktur) },
  { name: 'Tribal', convert: mapChars(mappings.tribal) },
  { name: 'Pixelated', convert: mapChars(mappings.pixelated) },
  { name: 'Historical', convert: mapChars(mappings.historical) },
  { name: 'Graceful', convert: mapChars(mappings.graceful) },
  { name: 'Bold', convert: mapChars(mappings.bold) },
  { name: 'Sans-Serif Bold Italic', convert: mapChars(mappings.sansBoldItalic) },
  { name: 'Monospace', convert: mapChars(mappings.monospace) },
  { name: 'Neon', convert: mapChars(mappings.neon) },
  { name: 'Wide', convert: mapChars(mappings.wide) },
  { name: 'Sans-Serif', convert: mapChars(mappings.sansSerif) },
  { name: 'Sans-Serif Italic', convert: mapChars(mappings.sansItalic) },
  { name: 'Sans-Serif Bold', convert: mapChars(mappings.sansBold) },
  { name: 'Italic', convert: mapChars(mappings.italic) },
  { name: 'Bold Italic', convert: mapChars(mappings.boldItalic) },
  { name: 'Parenthesized', convert: mapChars(mappings.parenthesized) },
  { name: 'Small Capital', convert: mapChars(mappings.smallCapital) },
  { name: 'Emoji', convert: mapChars(mappings.emoji) },
  { name: 'Old Italic', convert: mapChars(mappings.oldItalic) },
  { name: 'Square', convert: mapChars(mappings.square) },
  // Heavy/Bold Borders
  { name: 'Power Block', convert: (text) => `█▓▒░ ${text} ░▒▓█` },
  { name: 'Steel Frame', convert: (text) => `┣╋━ ${text} ━╋┫` },
  
  // Elegant Frames  
  { name: 'Royal Scroll', convert: (text) => `╔════《 ${text} 》════╗` },
  { name: 'Gilded Frame', convert: (text) => `╒═══≪ ${text} ≫═══╕` },
  
  // Nature Themes
  { name: 'Floral Vine', convert: (text) => `╰┈⋞ ${text} ⋟┈╯` },
  { name: 'Forest Path', convert: (text) => `⤳⤏ ${text} ⤎⤲` },
  
  // Celestial
  { name: 'Starburst', convert: (text) => `⋆⋅⋆≛ ${text} ≛⋆⋅⋆` },
  { name: 'Moon Phase', convert: (text) => `☾⍟ ${text} ⍟☽` },
  
  // Tech/Digital
  { name: 'Cyber Grid', convert: (text) => `⌇⎔ ${text} ⎔⌇` },
  { name: 'Circuit Board', convert: (text) => `┣⊟ ${text} ⊟┫` },
  
  // Mystical
  { name: 'Runic Frame', convert: (text) => `ᛞᛟ ${text} ᛟᛞ` },
  { name: 'Mystic Seal', convert: (text) => `⌖⍣ ${text} ⍣⌖` },
  
  // Music/Art
  { name: 'Brush Stroke', convert: (text) => `⫰⫯ ${text} ⫯⫰` },
  { name: 'Gallery Frame', convert: (text) => `┣┫ ${text} ┣┫` },
  
  // Geometric
  { name: 'Angular', convert: (text) => `◸◹ ${text} ◺◿` },
  { name: 'Precision', convert: (text) => `⟐◇ ${text} ◇⟐` },
  
  // Vintage
  { name: 'Antique Scroll', convert: (text) => `⌠⌡ ${text} ⌠⌡` },
  { name: 'Retro Panel', convert: (text) => `◈◈ ${text} ◈◈` },
  
  // Special Effects
  { name: 'Shadow Box', convert: (text) => `╭╮ ${text} ╭╮` },
  { name: 'Dimensional', convert: (text) => `╔╗ ${text} ╚╝` },
  
  // Minimalist
  { name: 'Subtle Brackets', convert: (text) => `⟦ ${text} ⟧` },
  { name: 'Light Frame', convert: (text) => `┌─ ${text} ─┐` },
  
  // Abstract
  { name: 'Waveform', convert: (text) => `∿∿ ${text} ∿∿` },
  { name: 'Floating', convert: (text) => `⍜⍝ ${text} ⍞⍟` },
  
  // Industrial
  { name: 'Rivet Border', convert: (text) => `┣━ ${text} ━┫` },
  { name: 'Metal Plate', convert: (text) => `⍈ ${text} ⍇` },
  
  // Typographic
  { name: 'Inset Text', convert: (text) => `⸢ ${text} ⸥` },
  { name: 'Quill Script', convert: (text) => `⌠ ${text} ⌡` },
  { name: 'Bubble', convert: mapChars(mappings.bubble) },
  { name: 'Block', convert: mapChars(mappings.block) },
  { name: 'Dark Bubble', convert: mapChars(mappings.darkBubble) },
  { name: 'Cute', convert: mapChars(mappings.cute) },
  { name: 'Upside Down', convert: mapChars(mappings.upsideDown) },
  { name: 'Small', convert: mapChars(mappings.small) },
  { name: 'Ancient', convert: mapChars(mappings.ancient) },
  { name: 'Subscript', convert: mapChars(mappings.subscript) },
  { name: 'Wavy', convert: mapChars(mappings.wavy) },
  { name: 'Eastern', convert: mapChars(mappings.eastern) },
  { name: 'Reverse Text', convert: (text) => text.split('').reverse().join('') },
  { name: 'Backward Flip Text', convert: mapChars(mappings.backwardFlip) },
  { name: 'Mirror Text', convert: mapChars(mappings.mirror) },
  { name: 'Modern', convert: mapChars(mappings.modern) },
  { name: 'Fantasy', convert: mapChars(mappings.fantasy) },
  { name: 'Blended Asian', convert: mapChars(mappings.blendedAsian) },
  { name: 'Soft', convert: mapChars(mappings.soft) },
  { name: 'Prime', convert: mapChars(mappings.prime) },
  { name: 'Adaptive', convert: mapChars(mappings.adaptive) },
  { name: 'Varied', convert: mapChars(mappings.varied) },
  { name: 'Striped', convert: mapChars(mappings.striped) },
  { name: 'Dreamy', convert: mapChars(mappings.dreamy) },
  { name: 'Iconic', convert: mapChars(mappings.iconic) },
  { name: 'Shadow', convert: mapChars(mappings.shadow) },
  { name: 'Squiggle', convert: mapChars(mappings.squiggle) },
  { name: 'Playful', convert: mapChars(mappings.playful) },
  { name: 'Refined', convert: mapChars(mappings.refined) },
  { name: 'Paint', convert: mapChars(mappings.paint) },
  { name: 'Reverse Style', convert: mapChars(mappings.reverseStyle) },
  { name: 'Antique', convert: mapChars(mappings.antique) },
  { name: 'Unique Glyph', convert: mapChars(mappings.uniqueGlyph) },
  { name: 'Decorative', convert: mapChars(mappings.decorative) },
  { name: 'Minimal Charm', convert: mapChars(mappings.minimalCharm) },
  { name: 'Gentle', convert: mapChars(mappings.gentle) },
  
  // Fitness/Strength Themed
  { name: 'Power Lift', convert: (text) => `⛓️✠━━ ${text} ━━✠⛓️` },
  { name: 'Gym Rat', convert: (text) => `🏋️♂️❚${text}❚🏋️♀️` },
  { name: 'Iron Strong', convert: (text) => `🦾▐█${text}█▌💪` },

  // Star/Celestial Themed
  { name: 'Celestial', convert: (text) => `☄️⋆｡°✩ ${text} ✩°｡⋆☄️` },
  { name: 'Starburst', convert: (text) => `✧⋄⋆⋅⋆⋄ ${text} ⋄⋆⋅⋆⋄✧` },
  { name: 'Galactic', convert: (text) => `🪐••⭐ ${text} ⭐••🪐` },

  // Floral/Nature Themed
  { name: 'Blooming', convert: (text) => `✿ꕥ❀ ${text} ❀ꕥ✿` },
  { name: 'Forest', convert: (text) => `🌲⸙ ${text} ⸙🌳` },
  { name: 'Meadow', convert: (text) => `🌼•॰ ${text} ॰•🌼` },

  // Royal/Elegant Themed
  { name: 'Regal', convert: (text) => `♚▁▂▃ ${text} ▃▂▁♛` },
  { name: 'Velvet Rope', convert: (text) => `🎀✧∘˚ ${text} ˚∘✧🎀` },
  { name: 'Gilded', convert: (text) => `𓂀⟡ ${text} ⟡𓂀` },

  // Tech/Digital Themed
  { name: 'Cyber', convert: (text) => `⎔⟁⍟ ${text} ⍟⟁⎔` },
  { name: 'Neon Grid', convert: (text) => `⊡⊟⊞ ${text} ⊞⊟⊡` },
  { name: 'Hacker', convert: (text) => `⎆⍓ ${text} ⍓⎆` },

  // Holiday/Festive Themed
  { name: 'Christmas', convert: (text) => `🎄•⛄ ${text} ⛄•🎄` },
  { name: 'Halloween', convert: (text) => `🎃👻✧ ${text} ✧👻🎃` },
  { name: 'Fireworks', convert: (text) => `🎆✨ ${text} ✨🎇` },

  // Food/Drink Themed
  { name: 'Bubble Tea', convert: (text) => `🧋⚪ ${text} ⚪🧋` },
  { name: 'Sushi', convert: (text) => `🍣・ ${text} ・🍱` },
  { name: 'Candy', convert: (text) => `🍬❈ ${text} ❈🍭` },

  // Animal Themed
  { name: 'Paws', convert: (text) => `🐾⋆ ${text} ⋆🐾` },
  { name: 'Feather', convert: (text) => `🪶✧ ${text} ✧🪶` },
  { name: 'Scales', convert: (text) => `🐍≀ ${text} ≀🐍` },

  // Music/Art Themed
  { name: 'Melody', convert: (text) => `🎵♪ ${text} ♫🎶` },
  { name: 'Painter', convert: (text) => `🎨✐ ${text} ✎🎨` },
  { name: 'Film Reel', convert: (text) => `🎞️▸ ${text} ◂🎞️` },

  // Mystical/Magic Themed
  { name: 'Wizard', convert: (text) => `🧙♂️⋆ ${text} ⋆🧙♀️` },
  { name: 'Tarot', convert: (text) => `🔮✧ ${text} ✧🔮` },
  { name: 'Alchemy', convert: (text) => `⚗️≀ ${text} ≀⚗️` },

  // Extreme/Sports Themed
  { name: 'Skate', convert: (text) => `🛹✧ ${text} ✧🛹` },
  { name: 'Surf', convert: (text) => `🏄♂️〜 ${text} 〜🏄♀️` },
  { name: 'Climb', convert: (text) => `🧗♂️⛰️ ${text} ⛰️🧗♀️` },


  { name: 'Static', convert: mapChars(mappings.staticFont) },
  { name: 'Trendy', convert: mapChars(mappings.trendy) },
  { name: 'Underline', convert: applyCombiningChar('\u0332') }, // Combining Low Line
  { name: 'Underline (Double Macron)', convert: applyCombiningChar('\u035F') }, // Combining Double Macron Below
  { name: 'Double Underline', convert: applyCombiningChar('\u0333') }, // Combining Double Low Line
  { name: 'Twin Top', convert: applyCombiningChar('\u033F') }, // Combining Double Overline
  { name: 'Strikethrough', convert: applyCombiningChar('\u0336') }, // Combining Long Stroke Overlay
  { name: 'Slash Overlay', convert: applyCombiningChar('\u0338') }, // Combining Long Solidus Overlay
  { name: 'Wave Overlay', convert: applyCombiningChar('\u0334') }, // Combining Tilde Overlay
  { name: 'Framed', convert: applyCombiningChar('\u033E\u0353') }, // Combining vertical line overlay + X below
  { name: 'Connected', convert: wrapChars('⊰', '⊱') },
  { name: 'Sharp', convert: wrapChars('⧼', '⧽') },
  { name: 'Tibetan', convert: wrapChars('࿙', '࿚') },
  { name: 'Enclosed', convert: wrapChars('⌠', '⌡') },
  { name: 'Pointed', convert: (text) => text.split('').map((char, i) => (i % 2 === 0 ? '➹' : '➷') + char).join('') },
  { name: 'Lunar', convert: wrapChars('☾', '☽') },
  { name: 'Pointed Dots', convert: wrapChars('⦑', '⦒') },
  { name: 'Curved Accent', convert: applyCombiningChar('\u0313') }, // Combining Comma Above
  { name: 'Curved Light', convert: wrapChars('╰', '╯') },
  { name: 'Crowned', convert: applyCombiningChar('\u030A') }, // Combining Ring Above
  { name: 'Z Lines', convert: applyCombiningChar('\u035B') }, // Combining Zigzag Above
  { name: 'Pointed Accent', convert: applyCombiningChar('\u0302') }, // Combining Circumflex Accent
  { name: 'Wavy Accent', convert: applyCombiningChar('\u0303') }, // Combining Tilde
  { name: 'Glyph Cap', convert: applyCombiningChar('\u0306') }, // Combining Breve
  { name: 'Short Mark', convert: applyCombiningChar('\u030B') }, // Combining Double Acute Accent
  { name: 'Balanced Line', convert: applyCombiningChar('\u034A') }, // Combining Not Tilde Above
  { name: 'Spotted', convert: applyCombiningChar('\u0307') }, // Combining Dot Above
  { name: 'Under Curve', convert: applyCombiningChar('\u035C') }, // Combining Double Breve Below
  { name: 'Wave Top', convert: applyCombiningChar('\u033E') }, // Combining Vertical Tilde
  { name: 'Circular Style', convert: applyCombiningChar('\u030A\u2AF6') }, // Combining Ring Above + Combining Three Dots Above
  { name: 'Intersected', convert: applyCombiningChar('\u033D\u034A') }, // Combining X Above + Combining Not Tilde Above
  { name: 'Bottom Arrow', convert: applyCombiningChar('\u034E') }, // Combining Upwards Arrow Below
  { name: 'Wave Under', convert: applyCombiningChar('\u0330') }, // Combining Tilde Below
  { name: 'Dual Curve', convert: applyCombiningChar('\u035C\u0361') }, // Combining Double Breve Below + Combining Double Inverted Breve
  { name: 'Curvy Link', convert: wrapChars('', '⌇') },
  { name: 'Subflow', convert: wrapChars('', '‿') },
  { name: 'Double Slash', convert: wrapChars('', 'ｯ') },
  { name: 'Arrow Spark', convert: wrapChars('', '↯') },
  { name: 'OneLine Alpha', convert: wrapChars('', '१') },
  { name: 'Starry Mark', convert: wrapChars('', '※') },
  { name: 'Looped', convert: wrapChars('', '෴') },
   { name: 'Boxed', convert: wrapChars('[', (char) => char + '\u0332]') }, // Apply underline dynamically
  { name: 'Arrowed Bound', convert: wrapChars('⧼', (char) => char + '\u032B⧽') }, // Combining Inverted Double Arch Below
  { name: 'Accented', convert: wrapChars('⦏', (char) => char + '\u0302⦎') }, // Combining Circumflex Accent
  { name: 'Cloud Curve', convert: applyCombiningChar('\u0311\u032E') }, // Combining Inverted Breve + Combining Breve Below
  { name: 'Soft Curves', convert: wrapChars('⸦', '⸧') },
  { name: 'Triple Beam', convert: wrapChars('⚞', '⚟') },
  { name: 'Tri-Framed', convert: wrapChars('⫷', '⫸') },
  { name: 'Swirled', convert: wrapChars('⎰', '⎱') },
  { name: 'Frame', convert: wrapChars('⦓', '⦔') },
  { name: 'ZigZag Flow', convert: wrapChars('⇜', '⇝') },
  { name: 'Bold Edge', convert: wrapChars('【', '】') },
  { name: 'Corner Glow', convert: wrapChars('『', '』') },
  { name: 'Tick Frame', convert: wrapChars('⦍', '⦎') },
  { name: 'Soft Angles', convert: wrapChars('〖', '〗') },
  { name: 'Straight Waves', convert: applyCombiningChar('\u033E\u033E') }, // Combining Double Inverted Breve Below + Combining Three Dots Below
  { name: 'Burst Connect', convert: wrapChars('', '⨳') },
  { name: 'Dual Shift', convert: wrapChars('', '⊶') },
  { name: 'Twist Strike', convert: applyCombiningChar('\u0354\u21AF') }, // Combining Left Arrowhead Above + Combining Downwards Zigzag Arrow Below
  { name: 'Star Cluster', convert: wrapChars('', '⁂') },
  { name: 'ZigGlitch', convert: applyCombiningChar('\u035B\u299A') }, // Combining Zigzag Above + Combining Vertical Zigzag Line
  { name: 'Focused', convert: applyCombiningChar('\u035A\u035E') }, // Combining Double Ring Below + Combining Upwards Arrowhead and Downwards Arrowhead Below
  { name: 'Numerical Burst', convert: applyCombiningChar('\u0488\u0489') }, // Combining Cyrillic Hundred Thousands Sign + Combining Cyrillic Millions Sign
  { name: 'Corner Glide', convert: wrapChars('┌', '┐') },
  { name: 'Upward Force', convert: wrapChars('┞', '┦') },
  { name: 'Balanced Glow', convert: wrapChars('╽', '╿') },
  { name: 'Digital Disrupt', convert: applyCombiningChar('\u0489') }, // Combining Cyrillic Millions Sign
  { name: 'Dimmed', convert: wrapChars('░', '░') },
  { name: 'Cornered', convert: wrapChars('⌜', '⌝') },
  { name: 'Heavy Mark', convert: wrapChars('❰', '❱') },

  // Decorative Styles (Prefix/Suffix) - Needs specific font mapping inside if required
  { name: 'Spin Frame', convert: (text) => `╭⊰ ${text} ⊱╮` },
  { name: 'Moonlight', convert: (text) => `✦⁺₊✩☽⋆${text}⋆☾✩⁺₊✦` },
  { name: 'Fitness', convert: (text) => `❚█══ ${text} ══█❚` },
  { name: 'Spark Burst', convert: (text) => `⋆·˚˚°✦ ${text} ✦°˚˚·⋆` },
  { name: 'Floral Enchantment', convert: (text) => `⊱❀⊰ ${text} ⊱❀⊰` },
  { name: 'Starry Path', convert: (text) => `⊱⋆⊳ ${text} ⊲⋆⊰` },
  { name: 'Glow Line', convert: (text) => `╰┈☆ ${text} ☆┈╯` },
  { name: 'Quote Bold', convert: (text) => `❝${mapChars(mappings.bold)(text)}❞` },
  { name: 'Boldly Crafted', convert: (text) => `┗━━━━━━⊱ ${mapChars(mappings.boldItalic)(text)} ⊰━━━━━━┛` },
  { name: 'Royal Border', convert: (text) => `꧁♢✸ ${text} ✸♢꧂` },
  { name: 'Glam', convert: (text) => `╭─❖ ${text} ❖─╮` },
  { name: 'Star Shine', convert: (text) => `⋆˚｡⋆୨✧୧˚ ${text} ˚୨✧୧⋆｡˚⋆` },
  { name: 'Glitter', convert: (text) => `一═⌊✦⌋ ${text} ⌊✦⌋═一` },
  { name: 'Galaxy', convert: (text) => `⋆═✩═⋆ ${text} ⋆═✩═⋆` },
  { name: 'Spark', convert: (text) => `✧˚·̩̩̥͙˚̩̥̩̥·̩̩̥͙✧·̩̩̥͙˚̩̥̩̥˚·̩̩̥͙✧ ${text} ✧˚·̩̩̥͙˚̩̥̩̥·̩̩̥͙✧·̩̩̥͙˚̩̥̩̥˚·̩̩̥͙✧` },
  { name: 'Block Line', convert: (text) => `▂▃▅▇█▓▒ ${text} ▒▓█▇▅▃▂` },
  { name: 'Flower Frame', convert: (text) => `˜”°•✿•°”˜ ${text} ˜”°•✿•°”˜` },
  { name: 'Bars Around', convert: (text) => `▂ ▃ ▅ ▆ ▇ ▌${text}▐ ▇ ▆ ▅ ▃ ▂` },
  { name: 'Elegant Stars', convert: (text) => `✦•·.·¯˚·.·• ${text} •·.·˚¯·.·•✦` },
  { name: 'Shiny', convert: (text) => `˜”°•.¸✦¸.•°”˜ ${text} ˜”°•.¸✦¸.•°”˜` },
  { name: 'Night Stars', convert: (text) => `★.¸¸.•´¯\`•.¸¸.★ ${text} ★.¸¸.•´¯\`•.¸¸.★` },
  { name: 'Flow', convert: (text) => `✧•〰〰〰〰〰〰•★ ${text} ✧•〰〰〰〰〰〰•★` },
  { name: 'Flowered', convert: (text) => `∴.·:¨⋆¨:·. ⚘.·:¨ ¨:·.✼ ${text} ✼ .·:¨⋆¨:·. ⚘.·:¨ ¨:·.∴` },
  { name: 'Shining Touch', convert: (text) => `(¯★.¸(¯★.¸ ${text} ¸.★´¯)¸.★´¯)` },
  { name: 'Flowered', convert: (text) => `∴.·:¨⋆¨:·. ⚘.·:¨ ¨:·.✼ ${text} ✼ .·:¨⋆¨:·. ⚘.·:¨ ¨:·.∴` },
  { name: 'Cosmic Sparkle', convert: (text) => `✧･ﾟ: ✧･ﾟ: ${mapChars(mappings.monospace)(text)} :･ﾟ✧:･ﾟ✧` },
  { name: 'Blocky', convert: (text) => `▞▞▞▞ ${mapChars(mappings.darkBubble)(text)} ▞▞▞▞` },
  { name: 'Shadow Decor', convert: (text) => `✦▄✦▀✦▄ ${mapChars(mappings.darkBubble)(text)} ▄✦▀✦▄✦` }, // Renamed to avoid conflict
  { name: 'Graceful Script', convert: (text) => `꧁✬◦°⋆⋆°◦. ${mapChars(mappings.cursive)(text)} ◦°⋆⋆°◦✬꧂` },
  { name: 'Midnight Sparkles', convert: (text) => `★·.·⍣·.·★.· ${mapChars(mappings.gothic)(text)} ★·.·⍣·.·★.·` },
  { name: 'Struck Charm', convert: (text) => `─═✩✧═─ ${mapChars(mappings.doubleStruck)(text)} ─═✧✩═─` },
  { name: 'Celestial Gateway', convert: (text) => `☊⍜⋇≋ ${text} ≋⋇⍜☋` },

];
window.generateFonts = (text) => {
  const results = {};
  window.fontStyles.forEach(style => {
    // Basic check for non-empty/whitespace text
    const trimmedText = text.trim();
    if (trimmedText === '') {
         results[style.name] = ''; // Return empty string if input is empty/whitespace
    } else {
        try {
            results[style.name] = style.convert(trimmedText);
        } catch (e) {
            console.error(`Error converting text for style "${style.name}":`, e);
            results[style.name] = "Error"; // Indicate conversion failure
        }
    }

  });
  return results;
};