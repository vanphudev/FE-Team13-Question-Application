import Box from "@mui/material/Box";
import CardQuestion from "./cardQuestion";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useWindowSize from "../../utils/useWindowSize";

function caculateWidth(windowSize) {
   if (windowSize > 2050) {
      return {size: 5, width: 2050};
   } else if (windowSize > 1650) {
      return {size: 4, width: 1650};
   } else if (windowSize > 1250) {
      return {size: 3, width: 1250};
   } else if (windowSize > 850) {
      return {size: 2, width: 850};
   } else {
      return {size: 1, width: 450};
   }
}

function ListCard({listQuestions, setListQuestions}) {
   const countColum = caculateWidth(useWindowSize().width);
   return (
      <Box sx={{width: "100%", margin: "0 auto"}}>
         {listQuestions && listQuestions.length > 0 ? (
            <Box
               sx={{
                  backgroundColor: "inherit",
                  width: countColum.width - 10 + "px",
                  margin: "0 auto",
                  display: "flex",
                  overflowY: "auto",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  gap: "10px",
                  "&::-webkit-scrollbar-track": {margin: 2},
               }}>
               {listQuestions?.map((items, index) => (
                  <CardQuestion size={countColum} key={index} card={items} setListQuestions={setListQuestions} />
               ))}
            </Box>
         ) : (
            <h1 style={{fontSize: "80px", color: "white", textAlign: "center", height: "50vh"}}>
               There are no questions !
            </h1>
         )}
      </Box>
   );
}

export default ListCard;
