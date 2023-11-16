export function generateMysqlCurrentTime(): string {
  //現在時刻生成
  const isoTimestamp = new Date().toISOString();
  //mysqlの形式にする
  const mysqlTimestamp = isoTimestamp.replace("T", " ").slice(0, 19);

  return mysqlTimestamp;
}
