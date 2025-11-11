import { useState, useEffect, JSX } from 'react';

interface ApiData {
  message: string;
  timestamp: string;
}

const SimpleTest = (): JSX.Element => {
  const [data, setData] = useState<ApiData | null>(null);
  const url = process.env.PUBLIC_URL + '/api/test';
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  console.log(process.env.PUBLIC_URL);
  return (
    <div>
      <h2>API Test Component</h2>
      {data ? (
        <div>
          <p>
            <strong>Message:</strong> {data.message}
          </p>
          <p>
            <strong>Time:</strong> {data.timestamp}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SimpleTest;
