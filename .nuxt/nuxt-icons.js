export default async function (ctx, inject) {
  const moduleOptions = {"accessibleIcons":true,"iconProperty":"$icon","icons":{"64":"\u002F_nuxt\u002Ficons\u002Ficon_64.9JIdADIFzhN.png","120":"\u002F_nuxt\u002Ficons\u002Ficon_120.9JIdADIFzhN.png","144":"\u002F_nuxt\u002Ficons\u002Ficon_144.9JIdADIFzhN.png","152":"\u002F_nuxt\u002Ficons\u002Ficon_152.9JIdADIFzhN.png","192":"\u002F_nuxt\u002Ficons\u002Ficon_192.9JIdADIFzhN.png","384":"\u002F_nuxt\u002Ficons\u002Ficon_384.9JIdADIFzhN.png","512":"\u002F_nuxt\u002Ficons\u002Ficon_512.9JIdADIFzhN.png"},"iconSrc":null,"iconFileName":"icon.png","sizes":[64,120,144,152,192,384,512],"targetDir":"icons"}
  inject(moduleOptions.iconProperty.replace('$', ''), retrieveIcons(moduleOptions.icons))
}

const retrieveIcons = icons => size => icons[size] || ''
