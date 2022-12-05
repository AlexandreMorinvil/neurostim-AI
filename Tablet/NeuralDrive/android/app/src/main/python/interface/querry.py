class Querry():
    start_time = None
    end_time = None
    x_chan = []
    query_result = None
    error_code = None

    def __init__(self, start_time, end_time, x_chan, query_result, error_code) -> None:
        self.start_time = start_time
        self.end_time = end_time
        self.x_chan = x_chan
        self.query_result = query_result
        self.error_code = error_code
        