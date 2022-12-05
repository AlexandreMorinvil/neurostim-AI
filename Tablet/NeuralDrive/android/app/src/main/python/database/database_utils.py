#############################################################################
#### This function converts a list of points into a string that can be 
#### appended to a INSERT SQL query to insert all the points in the Point
#### table at once. The format is the following :
####
#### "
#### (session_id, a_x, a_y, a_z, roll, pitch, yaw),
#### (session_id, a_x, a_y, a_z, roll, pitch, yaw),
#### ...
#### " 
#############################################################################
def convert_points_list_for_query_string(point_list, session_id):
    return ",".join(
        [str(tuple([session_id] + point)) for point in point_list]
    )
