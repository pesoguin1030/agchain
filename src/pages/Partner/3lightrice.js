import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 15,
    fontWeight: "bold",
  },
}))(TableCell);

function createData(date, operation, note) {
  return { date, operation, note };
}

const rows = [
  createData("插秧前1-2周", "第一次整地(乾整地)", "除去雜草，將土壤打碎"),
  createData(
    "插秧前6-7日",
    "施肥(基肥)",
    "每公頃施用氮素45公斤、磷酐50-60公斤、氧化鉀24公斤"
  ),
  createData("插秧前6-7日", "灌溉", "將田區浸水，土壤浸軟"),
  createData(
    "插秧前3-5日",
    "第二次整地(濕整地、整平)",
    "將土壤打為泥漿，並將田區整平"
  ),
  createData("插秧前2日", "施除草劑(萌前除草劑)", ""),
  createData("插秧前2日", "福壽螺防治", "施用苦茶粕或耐克螺等防治資材"),
  createData("插秧日", "排水", "將田水排乾以利插秧機作業"),
  createData(
    "插秧日",
    "插秧",
    "行距30公分；株距21公分，每叢秧苗5-8支，每公頃使用25-30片秧苗"
  ),
  createData("插秧後3日", "灌溉", "常保3-5公分水深至曬田"),
  createData("插秧後10-14日", "施肥(一次追肥)", "每公頃施用氮素30公斤"),
  createData("插秧後20日", "施除草劑(萌後除草劑)", ""),
  createData(
    "插秧後25-30日",
    "施肥(二次追肥)",
    "每公頃施用氮素45公斤、氧化鉀24公斤"
  ),
  createData(
    "插秧後45日(*參考)",
    "排水曬田",
    "*實際曬田日以每叢水稻有20支分蘗時即可進行"
  ),
  createData("曬田後5-7日", "灌溉", "常保3-5公分水深至收穫前7-10日"),
  createData(
    "插秧後55日",
    "病蟲害防治",
    "水稻二化螟蟲、葉稻熱病、紋枯病用藥防治"
  ),
  createData(
    "插秧後60-65日(*參考)",
    "施肥(穗肥)",
    "*實際施肥日以稻株內部幼穗長度介於0.5-1.0公分時為佳，每公頃施用氮素30公斤、氧化鉀12公斤"
  ),
  createData(
    "插秧後80日",
    "病蟲害防治",
    "水稻二化螟蟲、瘤野螟、褐飛蝨、穗稻熱病用藥防治"
  ),
  createData("插秧後120日", "排水", "田間乾燥促進稻穗成熟"),
  createData(
    "插秧後130日(*參考)",
    "收穫",
    "*收穫適期以稻穗基部2-3粒稻穀仍呈綠色，其餘都呈黃色時為最佳"
  ),
];

const rows2 = [
  createData("插秧前1-2周", "第一次整地(乾整地)", "除去雜草，將土壤打碎"),
  createData(
    "插秧前6-7日",
    "施肥(基肥)",
    "每公頃施用氮素40公斤、磷酐45-50公斤、氧化鉀28公斤"
  ),
  createData("插秧前6-7日", "灌溉", "將田區浸水，土壤浸軟"),
  createData(
    "插秧前3-5日",
    "第二次整地(濕整地、整平)",
    "將土壤打為泥漿，並將田區整平"
  ),
  createData("插秧前2日", "施除草劑(萌前除草劑)", ""),
  createData("插秧前2日", "福壽螺防治", "施用苦茶粕或耐克螺等防治資材"),
  createData("插秧日", "排水", "將田水排乾以利插秧機作業"),
  createData(
    "插秧日",
    "插秧",
    "行距30公分；株距21公分，每叢秧苗5-8支，每公頃使用25-30片秧苗"
  ),
  createData("插秧後3日", "灌溉", "常保3-5公分水深至曬田"),
  createData("插秧後7-10日", "施肥(一次追肥)", "每公頃施用氮素26公斤"),
  createData("插秧後12-14日", "施除草劑(萌後除草劑)", ""),
  createData(
    "插秧後18-20日",
    "施肥(二次追肥)",
    "每公頃施用氮素40公斤、氧化鉀28公斤"
  ),
  createData(
    "插秧後33-37日(*參考)",
    "排水曬田",
    "*實際曬田日以每叢水稻有15-20支分蘗時即可進行"
  ),
  createData("曬田後5-7日", "灌溉", "常保3-5公分水深至收穫前7-10日"),
  createData(
    "插秧後40-45日(*參考)",
    "施肥(穗肥)",
    "*實際施肥日以稻株內部幼穗長度介於0.5-1.0公分時為佳，每公頃施用氮素30公斤、氧化鉀12公斤"
  ),
  createData(
    "插秧後50-55日",
    "病蟲害防治",
    "水稻二化螟蟲、白葉枯病、褐飛蝨用藥防治"
  ),
  createData("插秧後110日", "排水", "田間乾燥促進稻穗成熟"),
  createData(
    "插秧後120日(*參考)",
    "收穫",
    "*收穫適期以稻穗基部2-3粒稻穀仍呈綠色，其餘都呈黃色時為最佳"
  ),
];

function Threelightrice() {
  const classes = useStyles();

  return (
    <div className="border-bottom mt-4">
      <div className="container space-1 space-lg-3">
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>台農82號水稻標準作業模式</h2>
        </div>
        <div className="container space-1">
          <div className="text-center">
            <h3>一期作</h3>
          </div>
          <div className="container space-1">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>日期</StyledTableCell>
                    <StyledTableCell>作業</StyledTableCell>
                    <StyledTableCell>備註</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.operation}</TableCell>
                      <TableCell align="left">{row.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="container space-1">
          <div className="text-center">
            <h3>二期作</h3>
          </div>
          <div className="container space-1">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>日期</StyledTableCell>
                    <StyledTableCell>作業</StyledTableCell>
                    <StyledTableCell>備註</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.operation}</TableCell>
                      <TableCell align="left">{row.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Threelightrice;
