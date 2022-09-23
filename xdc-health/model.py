from flask import Flask, requests

# basic flask server
app = Flask(__name__)

# home page
@app.route('/', methods=['GET', 'POST'])
def parse_request():
    symptoms = [
        request.form["itching"],
        request.form["skin_rash"],
        request.form["continuous_sneezing"],
        request.form["shivering"],
        request.form["stomach_pain"],
        request.form["acidity"],
        request.form["vomiting"],
        request.form["indigestion"],
        request.form["muscle_wasting"],
        request.form["patches_in_throat"],
        request.form["fatigue"],
        request.form["weight_loss"],
        request.form["sunken_eyes"],
        request.form["cough"],
        request.form["headache"],
        request.form["chest_pain"],
        request.form["back_pain"],
        request.form["weakness_in_limbs"],
        request.form["chills"],
        request.form["joint_pain"],
        request.form["yellowish_skin"],
        request.form["constipation"],
        request.form["pain_during_bowel_movements"],
        request.form["breathlessness"],
        request.form["cramps"],
        request.form["weight_gain"],
        request.form["mood_swings"],
        request.form["neck_pain"],
        request.form["muscle_weakness"],
        request.form["stiff_neck"],
        request.form["pus_filled_pimples"],
        request.form["burning_micturition"],
        request.form["bladder_discomfort"],
        request.form["high_fever"],
    ]
    
    return "<h1>Home Page</h1>"

if __name__ == "__main__":
    app.run(debug=True)

