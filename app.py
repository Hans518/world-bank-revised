from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

import csv
import json


# postgresURI = 'postgresql://postgres:password@localhost/trade_revised'
postgresURI = 'postgresql://postgres_master:DAXNq5My75bYXcYUAglj@trade-database.cwpd4dneht3a.us-east-2.rds.amazonaws.com:5432/postgres'


# AWS DB information 
#
# Master username: postgres_master
# Master password: DAXNq5My75bYXcYUAglj


# Instantiate the DB connection.
application = Flask(__name__)

application.config["SQLALCHEMY_DATABASE_URI"] = postgresURI
db = SQLAlchemy(application)
Base = automap_base()

Base.prepare(db.engine, reflect=True)
Base.classes.keys()

# A basic query getting everything in the table
tradeData = Base.classes.trade_table
trade_query = db.session.query(tradeData.reporter_name,
                     tradeData.trade_flow,
                     tradeData.partner_name,
                     tradeData.product_group,
                     tradeData.trade_indicator,
                     tradeData.y_2008,
                     tradeData.y_2009,
                     tradeData.y_2010,
                     tradeData.y_2011,
                     tradeData.y_2012,
                     tradeData.y_2013,
                     tradeData.y_2014,
                     tradeData.y_2015,
                     tradeData.y_2016,
                     tradeData.y_2017,
                     tradeData.y_2018)

# Close the connection after query
db.session.close()

# Creating a dictionary to be used as a json object in javascript
main_dict = []

for row in trade_query:
    data = {'Reporter':row[0],
            "trade_flow":row[1],
            "Partner":row[2],
            "product group":row[3],
            "indicator":row[4],
            "activity":
                        {"2008":float(row[5]),
                        "2009":float(row[6]),
                        "2010":float(row[7]),
                        "2011":float(row[8]),
                        "2012":float(row[9]),
                        "2013":float(row[10]),
                        "2014":float(row[11]),
                        "2015":float(row[12]),
                        "2016":float(row[13]),
                        "2017":float(row[14]),
                        "2018":float(row[15])}
    }
    main_dict.append(data)


@application.route("/")
def index():

    # csv_file = 'exported_csv_file.csv'

    # main_dict = []
    # with open(csv_file, 'r',encoding='utf-8') as csvfile:
    #     csvreader = csv.reader(csvfile, delimiter=",")
    #     header = next(csvreader)
    #     first_line = next(csvreader)
    #     reporter = first_line[0]
    #     partner = first_line[1]
    #     trade_flow = first_line[2]
    #     indicator = first_line[4]

    #     for row in csvreader:

    #         dict = {'Reporter':reporter,
    #                 "Partner":partner,
    #                 "trade_flow":trade_flow,
    #                 "indicator":indicator,
    #                 "product group":row[3],
    #                 "activity":
    #                             {"2008":float(row[5]),
    #                             "2009":float(row[6]),
    #                             "2010":float(row[7]),
    #                             "2011":float(row[8]),
    #                             "2012":float(row[9]),
    #                             "2013":float(row[10]),
    #                             "2014":float(row[11]),
    #                             "2015":float(row[12]),
    #                             "2016":float(row[13]),
    #                             "2017":float(row[14]),
    #                             "2018":float(row[15]),
    #                             "2019":float(row[16])}
    #         }
    #         main_dict.append(dict)

    # print(main_dict)
    return render_template('index.html', data=main_dict)

if __name__ == "__main__":
    application.debug=True
    application.run()