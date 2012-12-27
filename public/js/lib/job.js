define(function (require, exports, module) {
    var regjobs = {};//原始注册表
    var Job = lib.Class('Job',
    {
        construct: function (options) {
            this._oginjobs = [];//原始执行表
            this._execjobs = [];//待执行表
        },
        methods: {
            create:function(name,fn){
                if (!regjobs[name]) {
                    regjobs[name] = fn;
                }
                return this;
            },
            add:function(name,param){
                if (!regjobs[name]) {
                    return this;
                }
                for (var i = 0; i < this._oginjobs.length; i++) {
                    var job = this._oginjobs[i];
                    if(job.name == name){
                        return this;
                    }
                }
                this._oginjobs.push({
                    name:name,
                    param:param
                });
                this._execjobs = this._oginjobs.slice(0);
                return this;
            },
            reset:function(){
                this._execjobs = this._oginjobs.slice(0);
            },
            start:function(){
                var jobs = this._execjobs;
                while (jobs.length > 0){
                    var jobName = jobs[0].name;
                    var param = jobs[0].param;
                    var job = regjobs[jobName];
                    try{
                        job.call(null,param);
                        jobs.shift();
                    }catch(e){
                        lib.log("job[" + jobName + "] failed!!!");
                        lib.log('job start  msg: '+ e.message);
                        lib.log('job start file: '+ e.fileName);
                        lib.log('job start line: '+ e.lineNumber);
                        jobs.shift();
                    }
                }
            }
        }
    });

    module.exports = Job;
});