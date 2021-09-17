import numpy as np
import json
from bokeh.plotting import figure
from bokeh.embed import components
from bokeh.layouts import gridplot
from bokeh.sampledata.stocks import AAPL, GOOG, IBM, MSFT

def datetime(x):
    return np.array(x, dtype=np.datetime64)

def execute(data):
    p1 = figure(x_axis_type="datetime", title="Stock Closing Prices")
    p1.grid.grid_line_alpha=0.3
    p1.xaxis.axis_label = 'Date'
    p1.yaxis.axis_label = 'Price'

    p1.line(datetime(AAPL['date']), AAPL['adj_close'], color='#A6CEE3', legend_label='AAPL')
    p1.line(datetime(GOOG['date']), GOOG['adj_close'], color='#B2DF8A', legend_label='GOOG')
    p1.line(datetime(IBM['date']), IBM['adj_close'], color='#33A02C', legend_label='IBM')
    p1.line(datetime(MSFT['date']), MSFT['adj_close'], color='#FB9A99', legend_label='MSFT')
    p1.legend.location = "top_left"

    aapl = np.array(AAPL['adj_close'])
    aapl_dates = np.array(AAPL['date'], dtype=np.datetime64)

    window_size = 30
    window = np.ones(window_size)/float(window_size)
    aapl_avg = np.convolve(aapl, window, 'same')

    p2 = figure(x_axis_type="datetime", title=data)
    p2.grid.grid_line_alpha = 0
    p2.xaxis.axis_label = 'Date'
    p2.yaxis.axis_label = 'Price'
    p2.ygrid.band_fill_color = "olive"
    p2.ygrid.band_fill_alpha = 0.1

    p2.circle(aapl_dates, aapl, size=4, legend_label='close',
            color='darkgrey', alpha=0.2)

    p2.line(aapl_dates, aapl_avg, legend_label='avg', color='navy')
    p2.legend.location = "top_left"
    p = gridplot([[p1,p2]], plot_width=400, plot_height=400)
    script, div = components(p, wrap_script=False)
    data = json.dumps({'div': div, 'script': script, 'data': data})
    return data
    # N = 500
    # x = np.linspace(0, 10, N)
    # y = np.linspace(0, 10, N)
    # xx, yy = np.meshgrid(x, y)
    # d = np.sin(xx)*np.cos(yy)

    # p = figure(tooltips=[("x", "$x"), ("y", "$y"), ("value", "@image")], title=data)
    # p.x_range.range_padding = p.y_range.range_padding = 0

    # # must give a vector of image data for image parameter
    # p.image(image=[d], x=0, y=0, dw=10, dh=10, palette="Spectral11", level="image")
    # p.grid.grid_line_width = 0.5
    # script, div = components(p, wrap_script=False)
    # data = json.dumps({'div': div, 'script': script})
    # return data