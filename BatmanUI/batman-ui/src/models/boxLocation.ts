export default interface BoxLocation{
    id:number | null;
    startDay:Date;
    endDay:Date | null;
    latitude:String;
    longitude:String;
    siteName:String;
    habitat1:String;
    habitat2:String | null;
    operatorId:String;
    boxId:String;
}