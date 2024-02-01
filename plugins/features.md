# Feature toggles

The feature toggle plugin was created to enable us to toggle a/b test experiment features
without the rest of the code needing to know anything about the a/b testing setup. The client code
(or someone reading it) shouldn't need to know what experiment id #123 variant #2 means, it just
needs to know if a feature is enabled or disabled.

While this was created with a/b testing in mind it also has other applications:
See here for more about feature toggles: https://en.wikipedia.org/wiki/Feature_toggle

## Setup

Add your features and conditions to the `features` object in `/plugins/features.js`

```
import { $experiments } from useNuxtApp()

const features = {
  // experiment-bigger-logo
  // Makes the logo bigger
  // - Matt Walsh
  // Expires: 2023/04/30
  'experiment-bigger-logo':
    $experiments.current?.name === 'test' &&
    $experiments.activeVariant === 1
}
```

## Usage

### Using a feature toggle in CSS

Use the provided `{feature-name}-enabled` and `{featured-name}-disabled` classes to check if a feature is active

```
.experiment-bigger-logo-enabled .logo {
  font-size: 99px
}
```

### Using a feature toggle in a template

Use `$features.enabled` or `$features.disabled` to test if a feature is active.

```
<huge-arrow v-if="!$features.enabled['experiment-bigger-logo'] />
```

### Using a feature toggle in other code

Use `$features.enabled` or `$features.disabled` to test if a feature is active.

```
import { $features } from useNuxtApp()

mounted () {
  if ($features.enabled['experiment-bigger-logo']) {
    animateLogo()
  }
}
```

## Best practices

First, decide if it makes sense for your feature to use a feature toggle. While there
are several cases where they're useful, too many toggles will create technical debt.

When you add a new feature toggle, add a comment with a breif description of the feature
and your name to aid in cleaning up the toggle later. If possible add an expiration date for
the feature as well.

Use a prefixes to designate the type of feature.

| Feature Type | Prefix        |
|--------------|---------------|
| A/B Test     | `experiment-` |
