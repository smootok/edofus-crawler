# edofus-crawler

Crawler that help developers to build their Dofus app without worrying about how to get the encyclopedia data. The project is under development.

## Usage

Get one item by Type and URL

```bash
node index.js get <TYPE> -u <URL>
```

Get all items by Type

```bash
node index.js get-all <TYPE>
```

Get all effects from an output file

```bash
node index.js get-effects <FILENAME>
```

Download all images from an output file

```bash
node index.js download-images <FILENAME>
```

### Examples

Get one item by Type and URL

```bash
node index.js get equipment -u https://www.dofus.com/en/mmorpg/encyclopedia/equipment/14076-count-harebourg
```

Get all items by Type

```bash
node index.js get-all equipment
```

Get all effects from an output file

```bash
node index.js get-effects equipment.json
```

Download all images from an output file

```bash
node index.js download-images equipment.json
```

## License

Licensed under the MIT License. Feel free to use parts of the code in your own projects with attribution!
