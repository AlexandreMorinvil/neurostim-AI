# Specifying a different backend for matplotlib so that it can run outside the main thread
import matplotlib
matplotlib.use('Agg')

import base64
import io
import matplotlib.pyplot as plt
import numpy as np

def generate_heatmap_image(values_list, 
                           dimensions_list,
                           next_query,
                           x_parameter_name = "Amplitude",
                           y_parameter_name = "Frequency"):
    
    # Compute dimensions
    reshaped_values_list = np.reshape(values_list, dimensions_list)

    # number_dimensions = len(dimensions_list)
    # mean_axis_parameters_index_list = list(range(number_dimensions))
    # mean_axis_parameters_index_list.remove(first_parameter_index)
    # mean_axis_parameters_index_list.remove(second_parameter_index)

    heatmap_points = reshaped_values_list
    # if len(mean_axis_parameters_index_list) > 0:
    #     heatmap_points = np.mean(reshaped_values_list,
    #                              axis=mean_axis_parameters_index_list)

    # Main heatmap
    plt.clf()
    if next_query is not None:
        plt.scatter(next_query[1], next_query[0], zorder=2, color='red')
        # also show the coordinates of the next query
        # plt.text(next_query[1], next_query[0] - 0.75, '({}, {})'.format(next_query[1], next_query[0]), fontsize=8, color='red')

    plt.imshow(heatmap_points, zorder=1)
    plt.xlabel(x_parameter_name, fontsize='x-large')
    plt.ylabel(y_parameter_name, fontsize='x-large')

    # Legend
    cbar = plt.colorbar()
    cbar.set_label('Tremor suppression level', fontsize='large')

    # Generate image
    pic_iobytes = io.BytesIO()
    plt.savefig(pic_iobytes, format='png')
    pic_iobytes.seek(0)
    pic_hash = base64.b64encode(pic_iobytes.read())
    
    # Return image
    return pic_hash.decode("utf-8")

def generate_2d_graph_image(values_list,
                            dimensions_list, 
                            first_parameter_index,
                            x_parameter_name = ""):
    # Compute dimensions
    reshaped_values_list = np.reshape(values_list, dimensions_list)

    # number_dimensions = len(dimensions_list)
    # mean_axis_parameters_index_list = list(range(number_dimensions))
    # mean_axis_parameters_index_list.remove(first_parameter_index)
    # mean_axis_parameters_index_list.remove(second_parameter_index)

    graph_points = reshaped_values_list
    # if len(mean_axis_parameters_index_list) > 0:
    #     graph_points = np.mean(reshaped_values_list,
    #                              axis=mean_axis_parameters_index_list)

    x_points = np.arange(0, graph_points.shape[first_parameter_index])
    # for y_points we use the mean array of each column
    y_points = np.mean(graph_points, axis=1-first_parameter_index)

    # Main heatmap
    plt.clf()
    plt.plot(x_points, y_points, zorder=1)
    plt.scatter(x_points, y_points, zorder=2)

    plt.xlabel(x_parameter_name, fontsize='x-large')
    plt.ylabel('Tremor suppression level', fontsize='x-large')

    # Generate image
    pic_iobytes = io.BytesIO()
    plt.savefig(pic_iobytes, format='png')
    pic_iobytes.seek(0)
    pic_hash = base64.b64encode(pic_iobytes.read())

    # Return image
    return pic_hash.decode("utf-8")
