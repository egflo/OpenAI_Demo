import {Card, CardContent, Container, Typography} from "@mui/material";

export function Message(props) {

  const {query, text, index, finish_reason} = props.message;
  return (
      <Card
          sx = {
            {
                marginBottom: "1rem",
            }
          }
      >
          <CardContent>
              <Container
                  sx = {
                    {
                        //backgroundColor: "white",
                        //border: "1px solid #e5e5ea",
                       //borderRadius: "0.25rem",
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "San Francisco",
                        //fontSize: "1.25rem",
                        //margin: "0 auto 1rem",
                        //maxWidth: "30rem",
                        //padding: "0.5rem 1,5rem",
                    }
                  }
              >
                  <p
                      style = {
                          {
                              alignSelf: "flex-start",
                              fontFamily: "San Francisco",
                              fontSize: "1.25rem",
                              width: "100%",
                              backgroundColor: "#248bf5",
                              color: "white",
                              borderRadius: "1.15rem",
                              lineHeight: "1.5rem",
                              padding: "0.5rem 1rem",
                              position: "relative",
                              wordWrap: "break-word",
                              maxWidth: "20rem",
                          }
                      }
                  >
                      {query}
                  </p>
                  <p
                      style = {
                        {
                            alignSelf: "flex-end",
                            fontFamily: "San Francisco",
                            fontSize: "1.25rem",
                            width: "100%",
                            backgroundColor: "#e5e5ea",
                            borderRadius: "1.15rem",
                            lineHeight: "1.5rem",
                            padding: "0.5rem 1rem",
                            position: "relative",
                            wordWrap: "break-word",
                            maxWidth: "20rem",

                        }
                      }
                  >
                      {text}
                  </p>
              </Container>
          </CardContent>
      </Card>
  );
}