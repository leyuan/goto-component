# goto-component package

This packages provides a shortcut to navigate into your template file, avoid keep typing same thing over and over again in fuzzy finder.

### Example

```
{{tab-views/basic-task/create/client
    clients=sortedClients
    shouldShowClientModal=shouldShowClientModal
    shouldShowPropertyModal=shouldShowPropertyModal
    task=model}}
```

![cool cool](https://media.giphy.com/media/l0HlNEMs0Vqu79jCo/giphy.gif)


### Configs

Template Path - the path to your template files, use `<%= project_path %>` for project's path.

file name - the name of your template file, default `template.hbs`

### Key Mappings

`ctrl-q` to navigate into the file

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)
