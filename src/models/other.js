import dotenv from "dotenv";
dotenv.config();
import neo4j from "neo4j-driver";

const { url, username, password, database } = process.env;
import { nanoid } from "nanoid";
const driver = neo4j.driver(url, neo4j.auth.basic(username, password), {
  /* encrypted: 'ENCRYPTION_OFF' */
});
const session = driver.session({ database });

const createModel = async (model) => {
  const result = await session.run(
    `Create (m:Model {_id: '${nanoid(8)}', model: '${model.model}', category:'${
      model.category
    }' }) return m`
  );
  return result.records[0].get("m").properties;
};

const joinAllUsersWithModel = async () => {
  const allUsers = await session.run("Match (u:User) return u");
  let id_u = allUsers.records
    .map((i) => i.get("u").properties)
    .map((i) => i["_id"]);

  const allModels = await session.run("Match (m:Model) return m");
  let id_m = allUsers.records
    .map((i) => i.get("m").properties)
    .map((i) => i["_id"]);

  for (let i = 0; i < id_s.length; i++) {
    let result = await session.run(`MATCH (j:User {_id: '${id_s[i]}'})
                    MATCH (m:Model {_id: 'Z4hHWl5W'})
                    MERGE (j)-[r:DEALER_MODELS]->(m)
                    RETURN j, r, m`);
    console.log(result.records[0]);
  }
  return;
};
const createInsurer = async (insurer) => {
  const result = await session.run(
    `Create (i:Insurer {_id: '${nanoid(8)}', name: '${
      insurer.name
    }' }) return i`
  );
  return result.records[0].get("i").properties;
};

const createPolicy = async (policy) => {
  const result = await session.run(
    `Create (p:Policy {_id: '${nanoid(8)}', name: '${policy.name}' }) return p`
  );
  return result.records[0].get("p").properties;
};
/**
 * obj.user
 * obj.model
 * obj.insurer
 * obj.policy
 */
const addAmount = async (obj) => {

  let result = await session.run(`MATCH (u:User {name: '${obj.user}'})
                    MATCH (m:Model {model: '${obj.model}'})
                    MATCH (i:Insurer {name: '${obj.insurer}'} )
                    MATCH (p:Policy {name: '${obj.policy}'} )
                    MERGE (u)-[r1:DEALER_MODELS]->(m)-[r2:MODEL_INSURER]->(i)
                    -[r3:INSURER_POLICY]->(p)-[r4:PAYOUT_AMOUNT]->(a: Amount {payout:'${obj.payout}',
                    discount:'${obj.discount}'})
                    RETURN u,r1,m,r2,i,r3,p,r4,a`);
  return result.records[0]

};

const getAmount = async (obj) => {

  let result = await session.run(`MATCH (u:User {name: '${obj.user}'})
                    MATCH (m:Model {model: '${obj.model}'})
                    MATCH (i:Insurer {name: '${obj.insurer}'} )
                    MATCH (p:Policy {name: '${obj.policy}'} )
                    MATCH (u)-[r1:DEALER_MODELS]->(m)-[r2:MODEL_INSURER]->(i)
                    -[r3:INSURER_POLICY]->(p)-[r4:PAYOUT_AMOUNT]->(a: Amount )
                    RETURN a`);
  return result.records[0]

};


export default {
  createModel,
  createInsurer,
  createPolicy,
  addAmount,
  getAmount
};
