export const getImportExportEndpoint = (pathname:string,type:string) => {
    if (pathname.endsWith("venues")) {
      return `/api/admin/venue/${type}`;
    } else if (pathname.endsWith("categories")) {
      return `/api/admin/category/${type}`;
    }
    return `/api/admin/default/${type}`;
  };
