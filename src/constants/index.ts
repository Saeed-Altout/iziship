export const SMART_ROUTING_INPUTS = [
  { key: "woo",     label: "WooCommerce", logo: "/logos/marketplace/woocommerce-logo.svg" },
  { key: "shopify", label: "Shopify",     logo: "/logos/marketplace/shopify-logo.svg" },
  { key: "shopee",  label: "Shopee",      logo: "/logos/marketplace/shopee-logo.svg" },
  { key: "lazada",  label: "Lazada",      logo: "/logos/marketplace/lazada-logo.svg" },
  { key: "ebay",    label: "eBay",        logo: "/logos/marketplace/ebay-logo.svg" },
] as const;

export const SMART_ROUTING_OUTPUTS = [
  { key: "fedex",  label: "FedEx",         logo: "/logos/logistics-delivery/fedex-logo.svg" },
  { key: "jnt",    label: "J&T Express",   logo: "/logos/logistics-delivery/j_t-express-logo.svg" },
  { key: "jne",    label: "JNE Express",   logo: "/logos/logistics-delivery/jne-express-logo.svg" },
  { key: "gosend", label: "GoSend",        logo: "/logos/logistics-delivery/gosend-logo.svg" },
  { key: "paxel",  label: "Paxel",         logo: "/logos/logistics-delivery/paxel-logo.svg" },
  { key: "pos",    label: "Pos Indonesia", logo: "/logos/logistics-delivery/pos-indonesia-logo.svg" },
] as const;

export const SMART_ROUTING_ROTATES = ["rotate-2", "-rotate-2", "rotate-1", "-rotate-3", "rotate-3"] as const;

export const CARRIERS = [
  { name: "FedEx", src: "/logos/logistics-delivery/fedex-logo.svg" },
  {
    name: "J&T Express",
    src: "/logos/logistics-delivery/j_t-express-logo.svg",
  },
  {
    name: "JNE Express",
    src: "/logos/logistics-delivery/jne-express-logo.svg",
  },
  { name: "GoSend", src: "/logos/logistics-delivery/gosend-logo.svg" },
  { name: "GoBox", src: "/logos/logistics-delivery/gobox-logo.svg" },
  { name: "Paxel", src: "/logos/logistics-delivery/paxel-logo.svg" },
  { name: "ID Express", src: "/logos/logistics-delivery/id-express-logo.svg" },
  {
    name: "Pos Indonesia",
    src: "/logos/logistics-delivery/pos-indonesia-logo.svg",
  },
];
