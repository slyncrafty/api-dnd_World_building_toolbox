# DND World Building ToolBox

An interactive web app that helps users build a custom Dungeons & Dragons Background including name generation, personality traits, and themed color schemes.

- Uses D&D 5e API to fetch Race, Class, Background selection
- Uses ColorAPI to create color scheme

**Link to project:** https://slyncrafty.github.io/api-dnd_World_building_toolbox/

![Toolbox interface image](https://github.com/slyncrafty/slyncrafty.github.io/blob/main/images/pic06.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

- Uses [DND5eAPI](https://www.dnd5eapi.co/) to fetch:
  - Race, Class, and Background details and Key phrases.
- Color schemes generated using [ColorAPI](https://www.thecolorapi.com/) and a selection of base colors.
  - Base color is referenced from [dndbeyond](https://www.dndbeyond.com/forums/dungeons-dragons-discussion/arts-crafts/34956-class-colors)
- Name is generated from random sets based on race inspired by [[5E] I created a handy list from the names in the Player's Handbook ](https://www.reddit.com/r/DnD/comments/8zgm9g/5e_i_created_a_handy_list_from_the_names_in_the/) and [Fantasy Name Generators](https://www.fantasynamegenerators.com/dungeons-and-dragons.php)

## Lessons Learned:

- Working with open APIs.
- Building modular JS with separation of concerns.
- Generating dynamic UIs utilizing fetched data.(dropdown, swatch, lists)

## Optimizations

- Current generation is based on limited backstory elements available from the API. Expanding this wit generative API or GPT would provide richer contents.
- Saving out character details out as JSON or print-friendly formats.
