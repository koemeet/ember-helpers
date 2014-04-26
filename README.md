# Ember helpers

### Block helper
This helper is equalivant to a block inside the Twig templating language. It it very useful if you want to alter a
template outside another template.

#### Usage

<code>
// application.hbs
{{#block "name"}}

{{/block}}
</code>