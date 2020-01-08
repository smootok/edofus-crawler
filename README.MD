# edofus-crawler

Crawler that help developers to build their Dofus app without worrying about how to get the encyclopedia data. The project is under development.

## Usage

Get one item by Type and URL

```bash
node index.js get-item <TYPE> -u <URL>
```

Get all items by Type

```bash
node index.js get-all <TYPE>
```

### Examples

Get one item by Type and URL

```bash
node index.js get-item equipment -u https://www.dofus.com/en/mmorpg/encyclopedia/equipment/14076-count-harebourg
```

Get all items by Type

```bash
node index.js get-all equipment
```

## License

Licensed under the MIT License. Feel free to use parts of the code in your own projects with attribution!
