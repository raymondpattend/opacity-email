import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmailLog } from "@/functions/db/types";
import moment from "moment";

export function Data({data}: {data: EmailLog[]}) {
    return (
      <div className="bg-white/10 p-1 rounded-xl lg:mt-auto max-h-[50%] overflow-y-auto">
        <Table>
          <TableHeader className="hover:bg-inherit">
            <TableRow className="hover:bg-inherit">
              <TableHead className="w-[100px]">sender</TableHead>
              <TableHead>subject</TableHead>
              <TableHead className="text-left">date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? <TableRow><TableCell colSpan={3} className="text-center">no emails yet</TableCell></TableRow> : null}
            {data.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()).map((log) => (
              <TableRow key={log.id } className={log.declined ? "bg-red-500/10" : ""}>
                <TableCell className="max-w-[200px] w-full truncate" title={log.senderEmail}>{log.sender} ({log.senderEmail || '?'})</TableCell>
                <TableCell className="max-w-[300px] w-full truncate" title={log.subject}>{log.subject}</TableCell>
                <TableCell className="lowercase" title={moment(log.createdAt).format('MMMM Do YYYY, h:mm:ss a')}>{moment(log.createdAt).format('lll')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>

    )
}