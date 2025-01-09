
'use client'; // Ensure this component runs on the client side

import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, SubTitle } from 'chart.js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, SubTitle);

const StackedBarChart = ({ data, setGraphFilter, graphFilter }) => {
  const [graphTableVisibility,setGraphTableVisibility] = useState<boolean>(false);
  const documentRows = graphFilter != "Budget Expense"? [
    {
      title:data.datasets[0].label,
      data:data.datasets[0].data,
      color:data.datasets[0].backgroundColor,
    },
    {
      title:data.datasets[1].label,
      data:data.datasets[1].data,
      color:data.datasets[1].backgroundColor,
    },
    {
      title:data.datasets[2].label,
      data:data.datasets[2].data,
      color:data.datasets[0].backgroundColor,
    },
    {
      title:data.datasets[3].label,
      data:data.datasets[3].data,
      color:data.datasets[0].backgroundColor,
    },
    {
      title:data.datasets[4].label,
      data:data.datasets[4].data,
      color:data.datasets[0].backgroundColor,
    },
    {
      title:data.datasets[5].label,
      data:data.datasets[5].data,
      color:data.datasets[0].backgroundColor,
    },
    {
      title:data.datasets[6].label,
      data:data.datasets[6].data,
      color:data.datasets[0].backgroundColor,
    },
  ] : [
    {
      title:data.datasets[0].label,
      data:data.datasets[0].data,
      color:data.datasets[0].backgroundColor,
    },
    {
      title:data.datasets[1].label,
      data:data.datasets[1].data,
      color:data.datasets[1].backgroundColor,
    },
  ];
  const handleSelectChange = (value: string, name: string) => {
    setGraphFilter(value);
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        // align:"start",
        position:"left",
        text: graphFilter == 'Monthly Count'? 'Total Count' : 'INR Crore',
        font: {
          size: "12px",
          family: 'Poppins',
          // weight: '500',
          color: "#000000"
        },
        padding: {
          bottom:42
        }
      },
      // subtitle: {
      //   display: true,
      //   text: '(Total Estimated Expense- 6.59 CR)',
      //   // align: "start",
      //   position:"bottom",
      //   font: {
      //     size: "15px",
      //     family: 'Poppins',
      //     weight: 'normal',
      //   },
      //   padding: {
      //     bottom: 10
      //   }
      // }
    },
    scales: {
      x: {
        stacked: graphFilter == "Budget Expense" ? false : true,
        ticks: {
          font: {
              size: 10, 
          },
          color: '#000',
          callback: function (value: string | number) {
            // Wrap the text every N characters or split by spaces
            const label = this.getLabelForValue(value as number); // Retrieve the label text
            const maxLength = 10; // Maximum length of a line
            const words = label.split(' '); // Split label into words
            let lines: string[] = [];
            let currentLine = '';
  
            words.forEach((word) => {
              if ((currentLine + word).length > maxLength) {
                lines.push(currentLine);
                currentLine = word; // Start new line
              } else {
                currentLine += (currentLine ? ' ' : '') + word;
              }
            });
  
            if (currentLine) lines.push(currentLine); // Add the last line
            return lines;
          },
        },
      },
      y: {
        stacked: graphFilter == "Budget Expense" ? false : true, // Enable stacking on the y-axis
      },
    },
  };
  
  return <>
            <div className='flex justify-between items-start mb-4'>
              <div>
                  <h3 className='text-[25px] font-medium leading-[32px] text-[#05004E]'>{graphFilter == "Monthly Expense" ? 'Month-Wise Estimated Expense' : graphFilter == 'Monthly Count'? 'Monthly Activity Wise Count' : graphFilter == 'Budget Expense' ? 'Total Budget v/s Used Budget' : ''}</h3>
                  <span className='text-[15px] font-light leading-[32px] text-[#848484]'>{graphFilter == "Monthly Expense" ? `Total Estimated Expense: ${6.5}cr` : graphFilter == 'Monthly Count'?  `Total Activity Count: ${107}` : graphFilter == 'Budget Expense' ? `Total Estimated Budget: ${7}cr` : ''}</span>
              </div>
              <div className='flex space-x-3'>
                <div>
                   <Select
                      onValueChange={(value) => handleSelectChange(value, "graph_filter")}
                  >
                      <SelectTrigger className="dropdown" >
                          <SelectValue placeholder={"Monthly Count"} />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value={"Monthly Count"}>Monthly Count</SelectItem>     
                         <SelectItem value={"Monthly Expense"}>Monthly Expense</SelectItem>     
                         <SelectItem value={"Budget Expense"}>Budget Expense</SelectItem>     
                      </SelectContent>
                  </Select>
                </div>
              </div> 
            </div>
            <Bar options={options} data={data}/>
            <button className='px-3 py-1 text-black text-xs border rounded-md shadow' onClick={()=>setGraphTableVisibility(!graphTableVisibility)}>
            {
              !graphTableVisibility ?
              (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>) :
              (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>)
            }

            </button>

            {
              graphTableVisibility &&
              <div className=''>
                <Table className="mt-4 text-[12px]">
                  {/* <TableHeader><TableRow><TableCell></TableCell></TableRow></TableHeader> */}
                    {documentRows && documentRows.length > 0 ?
                        <TableBody className="text-black">
                            {documentRows && documentRows.map((row, index) => (
                              <TableRow key={index} className='gap-2 items-center'>
                                <TableCell className="w-[110px] px-0 overflow-x-clip">
                                  <div className='flex space-x-1 items-center'>
                                    {/* <span className={`w-[10px] h-[10px] rounded-[2px]`} style={{ backgroundColor: row.color }}></span> */}
                                    <span>{row.title}</span>
                                  </div>
                                </TableCell>
                                  {row.data.map((row, index) => (
                                    <TableCell className="">{row}</TableCell>
                                  ))}
                                  <TableCell className="text-center">{900}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                        :
                        <TableBody className="text-black">
                            <TableRow><TableCell colSpan={5} className="text-center text-black">No Results.</TableCell></TableRow>
                        </TableBody>
                    }
                </Table>
              </div>
            }
        </>;
};

export default StackedBarChart;