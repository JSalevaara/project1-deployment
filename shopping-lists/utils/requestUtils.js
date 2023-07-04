const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
  };

  const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };
  
  export { redirectTo, responseDetails };