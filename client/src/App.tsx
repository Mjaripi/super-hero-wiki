import axios from 'axios'
import { useQuery, useQueries } from '@tanstack/react-query'
import tableImage from './components/table-image'
import { AllDataResponse, HeroBaseData } from './response.types'

const corsPort = '8000'

const App = () => {
  const baseDataQuery = useQuery({
    queryKey: ['ids'],
    queryFn: () => 
      axios.get(`http://localhost:${corsPort}/all-ids`)
        .then((response) => response.data as HeroBaseData[]),
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const baseData = (baseDataQuery.data 
    ? baseDataQuery.data.slice(0,10)
    : [])

  const supDataQueries = useQueries({
    queries: baseData.map((data) => {
      return {
        queryKey: ['superHero', { id: data.id }],
        enabled: baseData.length > 0,
        queryFn: () => axios.get(`http://localhost:${corsPort}/${data.id}`)
          .then((response) => response.data as AllDataResponse),
        keepPreviousData: true,
      }
    })
  });

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 gap-4">
        <h2>TEST</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border p-5 rounded-md">
          DATA
        </div>
        <div className="col-span-2 border p-5 rounded-md">
          <table className="table-auto border-collapse border border-slate-500 rounded">
            <thead className="bg-teal-500">
              <tr>
                <th className="text-gray-800 px-2">id</th>
                <th className="text-gray-800 px-12">Nombre</th>
                <th className="text-gray-800 px-4">Imagen</th>
              </tr>
            </thead>
            <tbody>
              {baseData.map((data, index) => {
                return (
                  <tr id={index.toString()}>
                    <td className="border border-slate-400 px-2">{ data.id }</td>
                    <td className="border border-slate-400 pl-2 pr-10">{ data.name }</td>
                    <td className="border border-slate-400 p-2">{ tableImage(supDataQueries, index, data.name) }</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
