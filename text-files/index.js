const fs = require("fs");

async function findSalesFiles(folderName) {
  // массив будет содержать файлы продаж по мере их обнаружения 
  let salesFiles = [];

  async function findFiles(folderName) {
    // чтение всех элементов в текущей папке
    const items = await fs.readdirSync(folderName, { withFileTypes: true });

    // перебор каждого найденного элемента
    for (item of items) {
      // если элемент является каталогом, в нем нужно будет искать файлы
      if (item.isDirectory()) {
        // рекурсивно искать в этом каталоге файлы
        await findFiles(`${folderName}/${item.name}`);
      } else {
        // Убедитесь, что обнаруженный файл является файлом sales.json
        if (item.name === "sales.json") {
          // сохранить путь к файлу в массиве salesFiles
          salesFiles.push(`${folderName}/${item.name}`);
        }
      }
    }
  }

  // найти файлы продаж
  await findFiles(folderName);

  // вернуть массив найденных путей к файлам
  return salesFiles;
}

async function main() {
  const salesFiles = await findSalesFiles("stores");
  console.log(salesFiles);
}

main();
