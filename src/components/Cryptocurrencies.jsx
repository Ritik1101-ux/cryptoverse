import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Col, Row, Input } from "antd";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isLoading } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchItem)
    );
    setCryptos(filteredData);
  }, [cryptoList, searchItem]);
  
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt="img"
                    src={currency.iconUrl}
                    hoverable
                  />
                }
              >
                <p>Price : {millify(currency.price)}</p>
                <p>Market Cap : {millify(currency.marketCap)}</p>
                <p>Daily Change : {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
