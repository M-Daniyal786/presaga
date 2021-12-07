/* // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  // const res1 = await fetch('/api/v1/markets')
  const res1 = await fetch('https://presaga-beta.unitynetwork.app/api/v1/markets')
  const markets = await res1.json()

  
  res.status(200).json(markets)
}


const markets = {
  data: [
    {
      id: '0xd3ddd1f01b8ed1ac3ac86b06628ab9ecdc951912d3840f28b72e90c6ef34ab84',
      state: 'OPEN',
      title: '3rd scenario',
      creationDate: '2021-10-06T14:00:53.418Z',
      endDate: '2021-07-30T00:00:00.000Z',
      resolutionSource: 'gtg',
      description: 'grt',
      marketMakerAddress: '0x4c6Dc92cD7eb2076A7BdF8F423E855958D23D694',
      yesPositionID:
        '93716505752692253125786218195017178064286410204621929226511391809810489996716',
      noPositionID:
        '20518479680124385427049233654193527276995555332867741822275833562872354596774',
      questionId:
        '0x505245534147414d41524b45545f313633333532383831383532300000000000',
      oracle: '0xab013eb44d28483ab371e460e66fbf6628ae60c5',
      tradeVolume: 0,
    },
    {
      id: '0x0f97f4c912f206244d69a8bddde69a23d49d9cdd97e6534ca0c5f0f45e6636f9',
      state: 'OPEN',
      title: 'first market on arbitrum',
      creationDate: '2021-09-22T19:57:15.991Z',
      endDate: '2021-07-30T00:00:00.000Z',
      resolutionSource: 'bbc',
      description: 'testing volume',
      marketMakerAddress: '0x2B97AF562f4cbDA0C2bb56f8Dc9C037d0f693F25',
      yesPositionID:
        '39195729756247735255232643735582124980214342784997861666700575738137781293238',
      noPositionID:
        '92139264227659722292426198683309083357064387306554953124044117474574407218776',
      questionId:
        '0x505245534147414d41524b45545f313633323334303537303135340000000000',
      oracle: '0xab013eb44d28483ab371e460e66fbf6628ae60c5',
      tradeVolume: 0,
    },
    {
      id: '0xcaa1963168c9ec4c5f5d752c12259da7e7b650327cf5a662a848f385143ab3f5',
      state: 'RESOLVED',
      title: '2nd market',
      creationDate: '2021-10-06T13:57:21.726Z',
      endDate: '2021-07-30T00:00:00.000Z',
      resolutionSource: 'bbc',
      description: 'testing liquidity',
      marketMakerAddress: '0x436cBC58b6f2867344CbF508C60280DD1cb9a320',
      yesPositionID:
        '108068253599513736747781147169311488308289727018714974595912988171311400592098',
      noPositionID:
        '32009103633813813067597614493893026666866760742889688518294617022711252406637',
      questionId:
        '0x505245534147414d41524b45545f313633333532383539333437390000000000',
      oracle: '0xab013eb44d28483ab371e460e66fbf6628ae60c5',
      tradeVolume: 0,
    },
  ],
} */
