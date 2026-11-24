export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","flag","rollout"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.rollout==='string' && row.rollout.trim()) row.rollout=Number(row.rollout);
    if (!Number.isFinite(row.rollout)) throw new Error('Expected a numeric metric');
  }
  return {enabled:rows.filter(r=>r.rollout===100).map(r=>r.flag),experiments:rows.filter(r=>r.rollout>0&&r.rollout<100).map(r=>r.flag),invalid:rows.filter(r=>r.rollout<0||r.rollout>100).length};
}
