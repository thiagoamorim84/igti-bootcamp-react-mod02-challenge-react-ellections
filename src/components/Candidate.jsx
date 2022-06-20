import { numberFormat, percentNumberFormat } from '../util/util';

export default function Candidate({
  id,
  name = '',
  username = '',
  eleito = false,
  percentageOfVotes = 0,
  votes = +0,
}) {
  return (
    <div
      className={`shadow-lg p-4 m-2 w-80 h-48 
                  flex flex-col justify-evenly items-center
                   text-sm`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex flex-row m-2">
        <img
          src={`/img/${username}.png`}
          alt={`${name}`}
          className="rounded-full w-20"
        />
        <div className="flex flex-col w-full text-right m-5">
          <span className="text-2xl font-semibold">
            {percentNumberFormat.format(percentageOfVotes)}
          </span>
          <span>{numberFormat.format(votes)} votes</span>
        </div>
      </div>
      <span>{name}</span>
      <span>{eleito ? 'Eleito' : 'Não eleito'}</span>
    </div>
  );
}
