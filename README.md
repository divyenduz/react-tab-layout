# react-tab-layout
A react tab layout library that looks like the Android tab layout component ( http://w3z.in/27ef ). This library is heavily inspired from react-swipe-views ( http://w3z.in/845 ) but it does not support the swipe feature and supports dynamically changing children

# usage
Import the package using
`import TabLayout from 'react-tab-layout'`

Use it like
```
<TabLayout>
  <div title="Title one">
  Content one
  </div>
  <div title="Title two">
  Content two
  </div>
</TabLayout>
```

# quirks
This library imports css using `import 'TabLayout.css'` and for this to persist, this module must be passed through a CSS loader like ( https://github.com/webpack/css-loader )

I am open to listen about better ways of doing the css inclusion.
