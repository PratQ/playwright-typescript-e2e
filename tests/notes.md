# 🎭 Playwright Locators --- Beginner Notes

> **Learning goal:** Understand how `getByRole()`, `getByText()`, and
> `getByLabel()` find elements, how matching works, and when to use each
> locator.

------------------------------------------------------------------------


------------------------------------------------------------------------

# 1. 🔵 `getByRole()`

## What does it do?

-   Finds an element by its **role** and, optionally, its **accessible
    name**.
-   Common roles include `button`, `link`, `heading`, `checkbox`, and
    `textbox`.
-   🟢 Often a good choice for buttons, links, and other interactive
    elements.

## 🟣 Example

**HTML**

``` html
<a href="#">Home</a>
```

**Playwright**

``` typescript
const homeLink = page.getByRole('link', {
    name: 'Home',
    exact: true
});

await expect(homeLink).toBeVisible();
await homeLink.click();
```

## 🔎 How does Playwright find it?

``` text
HTML: <a href="#">Home</a>
             |
             v
       Role = link
 Accessible name = Home
             |
             v
getByRole('link', { name: 'Home', exact: true })
             |
             v
       Locates the link
             |
             v
          click()
```

## 🧠 Matching rules

-   `link` is the **role** Playwright looks for.
-   `name` matches the element's **accessible name**. This is not always
    identical to its visible text.
-   By default, string name matching is **case-insensitive** and allows
    **substring matches**.
-   `{ exact: true }` requests a **case-sensitive, whole-string match**.
    Leading and trailing whitespace is trimmed.
-   If `name` is a **regular expression**, the regular expression
    controls matching; `exact` is ignored.
-   A locator can match **more than one element**, even with exact
    matching.

### Partial match vs exact match

``` typescript
// May match a button named "Save Changes"
page.getByRole('button', { name: 'Save' });

// Matches a button whose accessible name is exactly "Save"
page.getByRole('button', {
    name: 'Save',
    exact: true
});
```

> 🟠 **Remember:** `exact: true` controls the name match. It does
> **not** guarantee that only one element matches.

------------------------------------------------------------------------

# 2. 🔵 `getByText()`

## What does it do?

-   Finds elements based on their **text content**.
-   Useful for paragraphs, messages, and other text displayed on the
    page.
-   Can match text when part of it is inside a nested HTML element.

## 🟣 Example: HTML with nested text

``` html
<p>
  This paragraph contains some
  <strong>important</strong>
  text that you might want to locate.
</p>
```

The word `important` is inside `<strong>`, but the whole sentence
belongs to the paragraph.

## A. Find one part of the text

``` typescript
const importantText = page.getByText('important', {
    exact: true
});

await expect(importantText).toBeVisible();
```

## B. Find the complete sentence

``` typescript
const fullText = page.getByText(
    'This paragraph contains some important text that you might want to locate.',
    { exact: true }
);

await expect(fullText).toBeVisible();
```

## 🔎 How does Playwright find it?

``` text
                    <p>
                     |
          -------------------------
          |           |           |
        Text 1     <strong>     Text 3
                       |
                   important
          -------------------------
                     |
                     v
         Combined paragraph text
                     |
             -----------------
             |               |
             v               v
   getByText('important')  getByText('full sentence')
             |               |
             v               v
    Finds a suitable       Can find the paragraph
    element containing    using its combined text
    "important"
```

> 🟠 **Important:** The three parts are **text nodes**, not necessarily
> three independently selectable HTML elements. `getByText()` locates
> elements; it does not directly select raw DOM text nodes.

## 🧠 Matching rules

-   By default, string text matching is **case-insensitive** and allows
    **substring matches**.
-   `{ exact: true }` requests a **case-sensitive, whole-string match**.
-   Whitespace is normalised: repeated spaces and line breaks are
    handled consistently, and leading/trailing whitespace is ignored.
-   With nested elements, Playwright can match the **smallest suitable
    element** containing the requested text. The actual match depends on
    the DOM structure and the text supplied.
-   Exact matching does **not** guarantee a unique element.
-   🟢 For buttons and links, consider `getByRole()` because it
    expresses the element's role and accessible name.

### Partial match vs exact match

Given:

``` html
<p>This is important information.</p>
```

``` typescript
// Can match the paragraph because it contains "important"
page.getByText('important');

// Does not match the whole paragraph text as an exact match
page.getByText('important', { exact: true });

// Matches the complete paragraph text
page.getByText('This is important information.', {
    exact: true
});
```

> 🔴 **Common mistake:** `exact: true` does not mean "find this word
> anywhere." It means the matched text must match the requested string
> as a whole, subject to Playwright's whitespace normalisation.

------------------------------------------------------------------------

# 3. 🔵 `getByLabel()`

## What does it do?

-   Finds a **form control** using its associated label.
-   Commonly used for text inputs, password fields, checkboxes, and
    other labelled controls.
-   Returns a locator for the **form control**, not the label element
    itself.
-   A control's accessible label may come from a `<label>`,
    `aria-labelledby`, or `aria-label`.

## 🟣 Example

**HTML**

``` html
<label for="password">Password:</label>
<input id="password" type="password">
```

**Playwright**

``` typescript
const passwordInput = page.getByLabel('Password');

await expect(passwordInput).toBeVisible();
await passwordInput.fill('Pass123');
```

## 🔎 How does Playwright find it?

``` text
<label for="password">
    Password:
</label>
         |
         | for="password"
         | matches the input's id
         v
<input id="password" type="password">
         |
         v
getByLabel('Password')
         |
         v
   Locates the input
         |
         v
fill('Pass123') enters the value
```

## Why does `'Password'` match `'Password:'`?

-   By default, string label matching is **case-insensitive** and allows
    **substring matches**.
-   Therefore, `Password` can match the label text `Password:`.
-   The `for` and `id` attributes associate the label with the input.
-   `.fill()` enters text into the input, **not** into the label.

## Exact matching example

``` typescript
// Matches the label "Password:"
const passwordInput = page.getByLabel('Password:', {
    exact: true
});

await passwordInput.fill('Pass123');
```

This does **not** match the label `Password:`:

``` typescript
page.getByLabel('Password', { exact: true });
```

## 🧠 Matching rules

-   By default, string label matching is **case-insensitive** and allows
    **substring matches**.
-   `{ exact: true }` requests a **case-sensitive, whole-string match**;
    surrounding whitespace is trimmed.
-   If a **regular expression** is supplied, it controls matching and
    `exact` is ignored.
-   The control must be identifiable through an associated label or
    accessible-label attribute.
-   Repeated or ambiguous labels can lead to a locator matching more
    than one control.

> 🟢 **Naming tip:** Prefer `passwordInput` over `passLabel`, because
> the locator points to the input.

------------------------------------------------------------------------

# 4. 🔵 `getByPlaceholder()`

## What does it do?

- Finds an input or textarea by the **placeholder text** shown when the field is empty.
- Useful when a field has a helpful placeholder, such as `Enter your full name`.
- 🟠 A placeholder is a hint; it should not replace a proper accessible label.

## 🟣 Example

**HTML**

```html
<input type="text" placeholder="Enter your full name">
<textarea placeholder="Type your message here..."></textarea>
```

**Playwright**

```typescript
const nameInput = page.getByPlaceholder('Enter your full name');
const messageBox = page.getByPlaceholder('Type your message here...');

await expect(nameInput).toBeVisible();
await nameInput.fill('John Doe');
await messageBox.fill('Hello!');
```

## 🔎 How does Playwright find it?

```text
placeholder="Enter your full name"
                |
                v
getByPlaceholder('Enter your full name')
                |
                v
         Locates the field
                |
                v
             fill(...)
```

## 🧠 Matching rules

- By default, string matching is **case-insensitive** and allows **substring matches**.
- `{ exact: true }` requests a case-sensitive, whole-string match (with surrounding whitespace trimmed).
- A regular expression can be used; the regular expression controls matching and `exact` is ignored.
- A locator can match more than one field if placeholders are repeated.

> 🔴 **Common mistake:** `getByPlaceholder()` finds a form field, not a button or a paragraph that happens to contain similar text.

---

# 5. 🔵 `getByAltText()`

## What does it do?

- Finds an element using its **`alt` attribute**.
- Most commonly used for images, where alternative text describes the image.
- 🟠 It matches the alt text; it does not by itself prove that the image file loaded successfully.

## 🟣 Example

**HTML**

```html
<img src="https://playwright.dev/img/playwright-logo.svg" alt="logo image">
```

**Playwright**

```typescript
const logo = page.getByAltText('logo image');

await expect(logo).toBeVisible();
```

## 🔎 How does Playwright find it?

```text
<img alt="logo image">
         |
         v
getByAltText('logo image')
         |
         v
     Locates the image
```

## 🧠 Matching rules

- By default, string matching is **case-insensitive** and allows **substring matches**.
- `{ exact: true }` requests a case-sensitive, whole-string match (with surrounding whitespace trimmed).
- Regular expressions are supported; the regular expression controls matching and `exact` is ignored.
- Multiple images can have the same alt text, so the locator may match more than one element.

> 🟢 **Good practice:** Use meaningful alt text in the HTML. For decorative images, follow accessibility guidance rather than adding meaningless alt text just to make a test locator work.

---

# 6. 🔵 `getByTitle()`

## What does it do?

- Finds an element by its **`title` attribute**.
- The title may appear as a tooltip when a user hovers over the element.
- It matches the attribute value, **not simply the visible text**.

## 🟣 Example from the practice HTML

**HTML**

```html
<a href="#" title="Home page link">Home</a>
<abbr title="HyperText Markup Language">HTML</abbr>
<span title="Tooltip text">This text has a tooltip</span>
```

**Playwright**

```typescript
const homeLink = page.getByTitle('Home page link');
const htmlAbbreviation = page.getByTitle('HyperText Markup Language');

await expect(homeLink).toBeVisible();
await expect(htmlAbbreviation).toBeVisible();
```

## 🧠 Matching rules

- By default, string matching is **case-insensitive** and allows **substring matches**.
- `{ exact: true }` requests a case-sensitive, whole-string match (with surrounding whitespace trimmed).
- Regular expressions are supported; the regular expression controls matching and `exact` is ignored.
- A title value does not have to be unique; repeated title attributes can match multiple elements.

> 🔴 **Common mistake:** In the example above, `getByTitle('HTML')` does not find the abbreviation because its `title` is `HyperText Markup Language`. `HTML` is its visible text, not its title attribute.

---

# 7. 🔵 `getByTestId()`

## What does it do?

- Finds an element by its test ID attribute. By default, Playwright uses **`data-testid`**.
- Useful when a stable test-specific identifier is needed and a role, label, or visible text is not the best fit.
- The test ID attribute can be configured to use another attribute, but the default is `data-testid`.

## 🟣 Example from the practice HTML

**HTML**

```html
<div class="card" data-testid="product-card-2">
    <h4 data-testid="product-name">Product B</h4>
    <p data-testid="product-price">$29.99</p>
</div>
```

**Playwright**

```typescript
const productB = page.getByTestId('product-card-2');
const productBPrice = productB.getByTestId('product-price');

await expect(productBPrice).toBeVisible();
await expect(productBPrice).toHaveText('$29.99');
```

## 🔎 How does scoping help with repeated test IDs?

```text
page
 |
 └── getByTestId('product-card-2')
              |
              └── getByTestId('product-price')
                           |
                           v
                         $29.99
```

The practice HTML contains three `product-price` elements—one in each product card. Start with the unique parent card, then find the price inside it. This is called **scoping a locator**.

## 🧠 Matching rules and best practices

- `getByTestId('product-price')` matches every element with that test ID; repeated test IDs are allowed by the locator.
- A locator matching multiple elements is not automatically unique. Use a unique parent, a meaningful filter, or `.nth()` when the position is intentionally relevant.
- `.nth()` is zero-based: `.nth(0)` is the first match, `.nth(1)` the second.
- Test IDs are exact attribute values by default; they are not matched against visible text.
- Test IDs are useful and stable when maintained intentionally, but user-facing locators such as roles and labels can better reflect how a user interacts with the page.

> 🟠 **Important:** `toHaveText()` checks displayed text in a paragraph such as `<p>$29.99</p>`. `toHaveValue()` is for form controls such as `<input>` and is not appropriate for a paragraph.

---

# 8. 📊 Quick comparison

| Locator | What identifies the element? | Common use |
|---|---|---|
| `getByRole()` | Role + optional accessible name | Buttons, links, checkboxes, headings |
| `getByText()` | Text content | Paragraphs and messages |
| `getByLabel()` | Label associated with a form control | Text and password inputs, checkboxes |
| `getByPlaceholder()` | Placeholder attribute | Inputs and textareas with placeholders |
| `getByAltText()` | `alt` attribute | Images and elements with alternative text |
| `getByTitle()` | `title` attribute | Elements with title/tooltip text |
| `getByTestId()` | Test ID attribute (default `data-testid`) | Stable test-specific targets |

------------------------------------------------------------------------

# 9. 🚦 Common rules to remember

1.  **A locator is a way to find an element.** It is not a permanent
    reference to a specific DOM element.
2.  **Exact matching is not uniqueness.** Multiple elements can have the
    same exact name, text, or label.
3.  **Actions need an unambiguous target.** Actions such as `.click()`
    and `.fill()` normally fail if the locator matches multiple
    elements.
4.  **Choose the locator that best describes the target.**
    -   Button or link → usually `getByRole()`
    -   Labelled form control → usually `getByLabel()`
    -   Paragraph or message → usually `getByText()`
    -   Field with placeholder → `getByPlaceholder()`
    -   Image with useful alt text → `getByAltText()`
    -   Element with a title attribute → `getByTitle()`
    -   Stable test-specific target → `getByTestId()`
5.  **Assertions and actions do different jobs.**
    -   `await expect(locator).toBeVisible()` checks visibility.
    -   `await locator.fill('text')` fills a form field.
    -   `await locator.click()` clicks the target.
6.  **Locators are resolved when used.** Playwright can find the
    matching element when an assertion or action runs, rather than
    storing a permanent reference to a DOM node.

------------------------------------------------------------------------

# 10. 🎯 Final takeaway

-   🔵 `getByRole()` → **What is the element's role, and what is its
    accessible name?**
-   🔵 `getByText()` → **What text does the element contain?**
-   🔵 `getByLabel()` → **Which form control is identified by this label?**
-   🔵 `getByPlaceholder()` → **What placeholder identifies this field?**
-   🔵 `getByAltText()` → **What alternative text identifies this image/element?**
-   🔵 `getByTitle()` → **What is the element’s `title` attribute?**
-   🔵 `getByTestId()` → **Which test ID identifies this element?**

> 🟢 **Best practice:** Write locators that are readable, stable, and
> specific enough to identify the intended element.

## 📚 Official references

-   [Playwright Locators Guide](https://playwright.dev/docs/locators)
-   [Playwright Locator
    API](https://playwright.dev/docs/api/class-locator)

------------------------------------------------------------------------

# 11. 🎤 Interview Q&A — Beginner to 3 Years' Experience

## Beginner (0–1 year)

### Q1. What is `getByPlaceholder()` used for?

**Answer:** It locates a form field using its placeholder text, for example `page.getByPlaceholder('Enter your full name')`.

### Q2. Is placeholder text the same as a label?

**Answer:** No. A placeholder is a hint displayed inside an empty field. A label identifies the field and is generally the better accessibility choice when available.

### Q3. What does `getByAltText()` locate?

**Answer:** It locates an element by its `alt` attribute, most often an image. Example: `page.getByAltText('logo image')`.

### Q4. What is the difference between `getByTitle()` and `getByText()`?

**Answer:** `getByTitle()` matches the `title` attribute; `getByText()` matches text content. An element's visible text and title attribute can be different.

### Q5. What is `getByTestId()`?

**Answer:** It locates an element by a test ID attribute. By default, Playwright looks for `data-testid`.

## Intermediate (1–2 years)

### Q6. What happens if three elements have `data-testid="product-price"`?

**Answer:** `page.getByTestId('product-price')` matches all three. The locator does not automatically select one unique element. Use a unique parent scope, an appropriate filter, or an intentional index.

### Q7. How would you check Product B's price if each product card uses the same `product-price` test ID?

**Answer:** First locate Product B's unique card, then locate the price inside it:

```typescript
const productB = page.getByTestId('product-card-2');
const price = productB.getByTestId('product-price');
await expect(price).toHaveText('$29.99');
```

### Q8. Should you use `toHaveValue()` or `toHaveText()` to verify a price inside a `<p>` element?

**Answer:** Use `toHaveText()`. A paragraph contains text; `toHaveValue()` is intended for form controls such as inputs.

### Q9. Does `{ exact: true }` guarantee that a locator matches only one element?

**Answer:** No. It makes the string match exact, but multiple elements can still have the same exact text, label, placeholder, or title.

### Q10. What should you check if `getByTitle('HTML')` finds no element, even though the page displays the word HTML?

**Answer:** Inspect the actual `title` attribute. In this practice HTML, the abbreviation displays `HTML`, but its title is `HyperText Markup Language`. `getByTitle()` matches the title attribute, not the visible word.

## Advanced / Interview scenarios (2–3 years)

### Q11. When might you choose `getByTestId()` over a user-facing locator?

**Answer:** When the element has a deliberately maintained, stable test ID and a role, label, or text locator is not suitable. Prefer user-facing locators when they clearly and reliably identify the element, because they reflect how users interact with the application.

### Q12. What is the risk of using `.nth(1)` to select a repeated element?

**Answer:** Indexes are zero-based and depend on element order. If the UI order changes, `.nth(1)` might select a different element. Prefer scoping to a unique parent or identifying the element by meaningful content when possible.

### Q13. What should you verify when using `getByAltText()`?

**Answer:** Verify that the intended element is located and visible as needed. `toBeVisible()` alone does not prove the image resource loaded successfully; check image loading separately if that is part of the test requirement.

### Q14. Are test IDs automatically unique in a page?

**Answer:** No. The application should maintain useful unique IDs where uniqueness is intended, but Playwright can return a locator matching multiple elements with the same test ID.

### Q15. A locator using `getByPlaceholder()` matches two fields. How would you resolve it?

**Answer:** Prefer a more specific locator or scope it to a unique section or parent. Use `.nth()` only when the order is stable and choosing by position is intentional.

### Q16. What is the difference between locating an element and asserting its state?

**Answer:** A locator such as `getByTestId()` identifies the target. An assertion such as `toBeVisible()` or `toHaveText()` verifies a condition about that target.

---

## 🔑 Interview quick revision

- `getByPlaceholder()` → placeholder attribute.
- `getByAltText()` → `alt` attribute.
- `getByTitle()` → `title` attribute, not visible text.
- `getByTestId()` → `data-testid` by default.
- Duplicate matches → scope to a unique parent or refine the locator.
- Paragraph text → `toHaveText()`; form-control value → `toHaveValue()`.
- `toBeVisible()` must be called with parentheses: `await expect(locator).toBeVisible()`.

