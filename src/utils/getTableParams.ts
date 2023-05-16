type TableParmasArg = {
  model: any;
  pageNo: number;
  pageSize: number;
  searchObj?: object;
};
async function getTableParams(arg: TableParmasArg): Promise<Object> {
  const { model, pageNo, pageSize, searchObj = {} } = arg;
  const totalCounts = await model.find(searchObj).countDocuments();
  const totalPages = Math.ceil(totalCounts / pageSize);
  return {
    pageNo,
    pageSize,
    totalPages,
    totalCounts,
  };
}

export default getTableParams;
