# The module contract · both directions

This is the whole of what a participant needs to know about host 2.
It is deliberately short.

## Direction 1 · host → module

The host loads your file and calls three exported functions:

```js
export function init(el, host)   { /* you were handed an empty element */ }
export function update(el, data) { /* new readings arrived */ }
export function destroy(el)      { /* optional, see below */ }

// `el` is a real DOM element. Blazor passes it as an ElementReference,
// host 1 passes it from getElementById. Either way the module is handed
// what it needs and never reaches into `document` to find it.
```

**`init` is called after the first render, not at import time.** During prerendering
there is no browser, so nothing that touches the DOM can run at module level.

## Direction 2 · module → host

`init` receives a `host` handle. Call back through it:

```js
host.invokeMethodAsync('Notify', 'pointPicked', { deviceId, value });
```

Or stay decoupled and emit an event the host listens for, preferred where possible,
because then your module holds no reference to the host at all:

```js
el.dispatchEvent(new CustomEvent('alarm:ack', { detail, bubbles: true }));
```

## Four things the host does NOT do for you

Three of these come straight out of Microsoft's own documentation, quoted below so you can
check them. One is not a Blazor rule at all; it is just how browsers work, and it is
marked as such.

### 1 · It does not guarantee `destroy` is called   `📄 documented`

> *"Don't execute JS interop code for DOM cleanup tasks during component disposal. Instead,
> use the MutationObserver pattern in JavaScript on the client for the following reasons:
> The component may have been removed from the DOM by the time your cleanup code executes
> in `Dispose{Async}`. During server-side rendering, the Blazor renderer may have been
> disposed by the framework by the time your cleanup code executes."*
>
>, [ASP.NET Core Blazor JS interop, .NET 9](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/?view=aspnetcore-9.0)

**So: detect removal from the JS side.** `destroy` is a convenience, not a guarantee.

### 2 · It does not make your calls synchronous   `📄 documented`

> *"JS interop calls are asynchronous, regardless of whether the called code is synchronous
> or asynchronous. Calls are asynchronous to ensure that components are compatible across
> server-side and client-side rendering models."*
>
>, same page

**So: never assume a reply is immediate**, and never call the host in a loop.

### 3 · It does not let you touch the DOM it owns   `📄 documented`

> *"Only mutate the DOM with JavaScript when the object doesn't interact with Blazor.
> Blazor maintains representations of the DOM and interacts directly with DOM objects. If
> an element rendered by Blazor is modified externally using JS directly or via JS Interop,
> the DOM may no longer match Blazor's internal representation."*
>
>, same page

**So: you are handed one element. Fill it. Do not reach outside it.**

### 4 · It does not clean up after you   `⚠️ not a Blazor rule`

This one is not in any Blazor document, because it is not about Blazor. Listeners you add,
timers you start and observers you connect belong to the browser, not to the component.
Nothing collects them when the component leaves; there is no garbage collector for an
`addEventListener`.

It is in this list because it is the one that actually costs you memory, and because
people expect the framework to handle it. It doesn't, and it never claimed to.
