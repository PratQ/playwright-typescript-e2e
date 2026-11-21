# CSS Selectors Cheat Sheet

> **Target Application:** [Demo Web Shop (Tricentis)](https://demowebshop.tricentis.com/)  

---

## 1. Basic Selectors

| Type | Description | CSS Selector | What it Targets |
| :--- | :--- | :--- | :--- |
| **Tag** | All input fields | `input` | All textboxes and buttons |
| **Tag** | All links | `a` | All navigation links |
| **Tag** | All buttons | `button` | Button elements |
| **ID** | Search textbox | `#small-searchterms` | Search input box |
| **ID** | Newsletter email | `#newsletter-email` | Footer email field |
| **ID** | Poll option | `#pollanswers-1` | Community poll radio option |
| **Class** | Header links | `.header-links` | Login / Register area |
| **Class** | Product grid | `.product-grid` | Featured products container |
| **Class** | Search box | `.search-box-text` | Search field |
| **Universal** | All elements | `*` | Entire DOM |

---

## 2. Attribute Selectors

| Match Type | Description | CSS Selector | What it Targets |
| :--- | :--- | :--- | :--- |
| **Has Attribute** | Has `type` attribute | `input[type]` | All inputs with a `type` |
| **Has Attribute** | Has `href` attribute | `a[href]` | All links with an `href` |
| **Exact (`=`)** | Text input | `input[type="text"]` | Text inputs |
| **Exact (`=`)** | Search button | `input[value="Search"]` | Search button |
| **Exact (`=`)** | Register link | `a[href="/register"]` | Register link |
| **Contains (`*=`)** | Contains `"cart"` | `a[href*="cart"]` | Cart link |
| **Contains (`*=`)** | Product class | `div[class*="product"]` | Product elements |
| **Starts With (`^=`)** | Books category | `a[href^="/books"]` | Books menu link |
| **Starts With (`^=`)** | Poll IDs | `input[id^="pollanswers"]` | Poll radio options |
| **Starts With (`^=`)** | Product blocks | `div[class^="product"]` | Product sections |
| **Ends With (`$=`)** | Login link | `a[href$="login"]` | Login link |
| **Ends With (`$=`)** | Wishlist link | `a[href$="wishlist"]` | Wishlist link |
| **Ends With (`$=`)** | Product images | `img[src$=".jpg"]` | Product `.jpg` images |

---

## 3. Combining Selectors

| Combination | Description | CSS Selector | What it Targets |
| :--- | :--- | :--- | :--- |
| **Tag + Class** | Search input | `input.search-box-text` | Search textbox |
| **Tag + Class** | Menu | `ul.top-menu` | Top navigation bar |
| **Tag + Class** | Product card | `div.product-item` | Individual product item |
| **Tag + ID** | Search input | `input#small-searchterms` | Search box |
| **Tag + ID** | Newsletter | `input#newsletter-email` | Email field |

---

## 4. Descendant & Child Selectors

| Combinator | Description | CSS Selector | What it Targets |
| :--- | :--- | :--- | :--- |
| **Descendant (` `)** | Links in header | `div.header-links a` | Login / Register links |
| **Descendant (` `)** | Product titles | `div.product-grid h2` | Product headings |
| **Descendant (` `)** | Menu links | `ul.top-menu a` | Navigation links |
| **Child (`>`)** | Menu items | `ul.top-menu > li` | Direct top category items |
| **Child (`>`)** | Product details | `div.product-item > div.details` | Product info container |
| **Child (`>`)** | Footer columns | `div.footer > div.column` | Footer sections |

---

## 5. Index-Based Selectors

| Pseudo-Class | Description | CSS Selector | What it Targets |
| :--- | :--- | :--- | :--- |
| **`:first-child`** | First menu item | `ul.top-menu li:first-child` | Books |
| **`:last-child`** | Last menu item | `ul.top-menu li:last-child` | Digital downloads |
| **`:nth-child(2)`** | 2nd menu item | `ul.top-menu li:nth-child(2)` | Computers |
| **`:nth-child(3)`** | 3rd menu item | `ul.top-menu li:nth-child(3)` | Electronics |
| **`:nth-child(1)`** | First product | `.product-grid .item-box:nth-child(1)` | Product 1 |
| **`:nth-child(2)`** | Second product | `.product-grid .item-box:nth-child(2)` | Product 2 |

---

## 6. Multiple Selectors (Grouping)

| Type | Description | CSS Selector | What it Targets |
| :--- | :--- | :--- | :--- |
| **Comma (`,`)** | Inputs + buttons | `input, button` | All form controls |
| **Comma (`,`)** | Headings | `h1, h2` | Main and secondary page headings |
| **Comma (`,`)** | Links + buttons | `a, button` | All clickable elements |

---

## 7. Automation-Friendly Selectors (Recommended)

| Use Case | CSS Selector | Why It's Good |
| :--- | :--- | :--- |
| **Search box** | `#small-searchterms` | Unique ID |
| **Search button** | `input[value="Search"]` | Stable attribute |
| **Register** | `a[href="/register"]` | Reliable route |
| **Login** | `a[href="/login"]` | Stable route |
| **Cart** | `a[href="/cart"]` | Common, predictable path |
| **Menu items** | `ul.top-menu > li` | Well-structured hierarchy |
| **Product cards** | `.product-item` | Reusable across grids |
| **Product title** | `.product-title a` | Clean and readable |
| **Price** | `.prices span` | Specific target |
| **Newsletter** | `#newsletter-email` | Unique ID |

---

## Top 10 Quick-Reference Selectors

| # | CSS Selector | Use Case |
| :-: | :--- | :--- |
| 1 | `#small-searchterms` | Search input |
| 2 | `input[value="Search"]` | Search button |
| 3 | `a[href="/register"]` | Register link |
| 4 | `a[href="/login"]` | Login link |
| 5 | `a[href="/cart"]` | Cart link |
| 6 | `ul.top-menu > li` | Top menu items |
| 7 | `.product-item` | Product cards |
| 8 | `.product-title a` | Product name |
| 9 | `.prices span` | Product price |
| 10 | `#newsletter-email` | Newsletter email field |

---

## Best Practices & Notes

* **Prefer ID selectors** (`#id`) whenever available for maximum stability.
* **Use attribute selectors** (`[attribute="value"]`) when unique IDs are not present.
* **Avoid overusing `:nth-child()`** unless positional selection is strictly necessary, as DOM order changes can break tests.
* **Combine selectors** (e.g., `tag.class` or `parent > child`) for better accuracy without making them overly brittle.
* **Keep selectors short and readable** so test scripts stay easy to maintain.