import Head from 'next/head'
import axios from "axios";
import React, {useEffect} from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  Checkbox, createSvgIcon,
} from '@mui/material';

import {Message} from "../components/Message";


export const Search = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
      <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
      />
    </svg>,
    'Search'
);

export default function Home(props) {
  const ref = React.useRef();
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState([]);

  function handleSubmit() {
      axios.post('https://api.openai.com/v1/engines/text-curie-001/completions ', {
              prompt : query,
              max_tokens : 10,
              temperature : 0.7,
              top_p : 0.9,
              frequency_penalty : 0.0,
              presence_penalty : 0.0,
          },
          {
              headers: {
                  'Authorization': `Bearer ${props.secret}`,
                  'Content-Type': 'application/json'
              }
          })
          .then(function (response) {
              const choices = response.data.choices;

              for (let i = 0; i < choices.length; i++) {
                  const finish_reason = choices[i].finish_reason;
                  const index = choices[i].index;
                  const text = choices[i].text;

                  setData(prev => [...prev, {
                      query: query,
                      finish_reason : finish_reason,
                      index : index,
                      text : text
                  }]);
              }
          })
          .catch(function (error) {
              console.log(error);
          });
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://beta.openai.com/overview">OpenAPI!</a>
        </h1>

        <p className="description">
          Get started by entering a prompt below.
        </p>

        <div className="grid">
          <div className="card">
            <h3>Prompt</h3>
            <Box {...props}>
              <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1,
                    minWidth: '100%',
                  }}
              >

              </Box>
              <Box sx={{ mt: 3}}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        <Box sx={{ minWidth: 500}}>
                          <TextField
                              ref={ref}
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                      <SvgIcon
                                          color="action"
                                          fontSize="small"
                                      >
                                        <Search />
                                      </SvgIcon>
                                    </InputAdornment>
                                )
                              }}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search for a prompt"
                              variant="outlined"
                              onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                      handleSubmit()
                                  }
                              }}
                          />

                        </Box>
                        <Box sx={{ m: 1 }}>
                          <Button
                              color="primary"
                              variant="contained"
                              onClick={handleSubmit}
                          >
                              Search
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
              </Box>
            </Box>
          </div>
          <div className="card">
            <h3>Response</h3>
              {data.reverse().map((item, index) => (
                  <Message key={index} message={item}></Message>
              ))}
          </div>
        </div>
      </main>

      <footer>
          Powered by OpenAI
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          min-width: 600px;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
export const getServerSideProps = ({ req, res }) => {
    // Fetch data from external API
    // Pass data to the page via props
    const secret = process.env.OPENAPI_SECRET;
    return { props: {secret } }
}
