/**
 * Created by zhuzhui on 2016/11/14.
 */

export function searchProductsBySkus(skus) {
  let params = {};
  let skuIds = skus.map(sku => sku.sku);

  params[`searchCriteria[filter_groups][0][filters][0][field]`] = 'sku';
  params[`searchCriteria[filter_groups][0][filters][0][value]`] = skuIds.join(',');
  params[`searchCriteria[filter_groups][0][filters][0][condition_type]`] = 'in';

  // skuIds.forEach((sku, i) => {
  //   params[`searchCriteria[filter_groups][0][filters][${i}][field]`] = 'sku';
  //   params[`searchCriteria[filter_groups][0][filters][${i}][value]`] = sku.sku;
  //   params[`searchCriteria[filter_groups][0][filters][${i}][condition_type]`] = 'eq';
  //
  // });

  return params;
}
